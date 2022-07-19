import { LightningElement, track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import USRID from '@salesforce/schema/User.Id';
import profileImg from '@salesforce/resourceUrl/profileImg';
import zipImages from '@salesforce/resourceUrl/zipImages';
import settingIcon from '@salesforce/resourceUrl/settingIcon';
import dragFileIcon from '@salesforce/resourceUrl/dragFileIcon';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import profilePageCss from '@salesforce/resourceUrl/profilePageCss';
import saveData from '@salesforce/apex/ts_ProfilePageController.saveData';
import getData from '@salesforce/apex/ts_ProfilePageController.getData';
import saveFile from '@salesforce/apex/ts_ProfilePageController.saveFile';
import getDocsData from '@salesforce/apex/ts_ProfilePageController.getDocsData';
import deleteFile from '@salesforce/apex/ts_ProfilePageController.deleteFile';
import saveCV from '@salesforce/apex/ts_ProfilePageController.saveCV';
import communityicon from '@salesforce/resourceUrl/communityicons';
import { deleteRecord } from 'lightning/uiRecordApi';


export default class Ts_ProfilePage extends LightningElement {

    profImg = profileImg;
    settingImg = settingIcon;
    dragFileImg = dragFileIcon;
    saveImg = communityicon + '/communityicons/save.png';
    cancelImg = communityicon + '/communityicons/cancel.png';
    updateImg = communityicon + '/communityicons/update.png';
    deleteImg = communityicon + '/communityicons/delete.png';
    blankProgileImg = communityicon + '/communityicons/profilephoto.png';

    @track imgUrl;
    @track usrId;
    @track fname;
    @track lname;
    @track email;
    @track businessphn;
    @track mobilephn;
    @track newImgUrl;
    @track newImgFile;
    @track deletePfp = false;
    @track cvId;
    @track cvName;
    @track isSpinner;
    file;
    fileContents;
    fileReader;
    content;


    connectedCallback() {
        this.getUsrData();
    }

    renderedCallback() {
        Promise.all([
                loadStyle(this, profilePageCss)
            ]).then(() => {
                console.log('Files loaded');
            })
            .catch(error => {
                this.template.querySelector('c-ts_-tost-notification').showToast('error', 'Something Went Wrong', 3000);
            });
    }

    getUsrData(event) {
        console.log('First time');
        getData()
            .then(result => {
                console.log({ result });
                this.fname = result.FirstName;
                this.lname = result.LastName;
                this.email = result.Email;
                this.businessphn = result.businessphn;
                this.mobilephn = result.mobilephn;
                this.imgUrl = result.FullPhotoUrl;
                this.newImgUrl = result.FullPhotoUrl;
            })
        getDocsData()
            .then(result => {
                console.log({ result });
                if (result != null) {
                    this.cvId = result.Id;
                    this.cvName = result.Title;
                    var cvData = this.template.querySelector('.cvData');
                    cvData.style.display = 'block';
                }
            })
            .catch(error => {
                this.template.querySelector('c-ts_-tost-notification').showToast('error', 'Something Went Wrong', 3000);
            })
    }

    @wire(getRecord, {
        recordId: USER_ID,
        fields: [USRID]
    }) wireuser({
        error,
        data
    }) {
        if (error) {
            this.error = error;
        } else if (data) {
            console.log('indatas');
            this.usrId = data.fields.Id.value;

        }
    }

    get acceptedFormats() {

        return ['.png', '.jpg', '.jpeg'];
    }

    // get data for upload CV
    handleFile(event) {
        var cvId = this.cvId;
        if (cvId == '' || cvId == undefined) {
            this.isSpinner = true;
            let fileList = event.target.files;
            this.file = fileList[0];
            this.showLoadingSpinner = true;
            this.fileReader = new FileReader();
            this.fileReader.onloadend = (() => {
                this.fileContents = this.fileReader.result;
                let base64 = 'base64,';
                this.content = this.fileContents.indexOf(base64) + base64.length;
                this.fileContents = this.fileContents.substring(this.content);
                this.cvUpload();
            });
            this.fileReader.readAsDataURL(this.file);
        } else {
            this.template.querySelector('c-ts_-tost-notification').showToast('error', 'Only One CV Allow.', 3000);
        }
    }

    // upload CV
    cvUpload(event) {
        var pId = this.usrId;
        console.log({ pId });
        var file = this.file;
        var fileContents = this.fileContents;
        saveCV({
                parentId: pId,
                fileName: file.name,
                base64Data: encodeURIComponent(fileContents)
            })
            .then(result => {
                console.log({ result });
                this.cvId = result[0];
                this.cvName = result[1];
                var cvData = this.template.querySelector('.cvData');
                cvData.style.display = 'block';
                this.isSpinner = false;
            })
            .catch(error => {
                this.template.querySelector('c-ts_-tost-notification').showToast('error', 'Something Went Wrong', 3000);
            });
    };

    // set input field data
    handleChange(event) {
        console.log('usr>>', this.usrId);
        if (event.target.name == 'firstname') {
            this.fname = event.target.value;
            console.log('this.fname>>', this.fname);
        } else if (event.target.name == 'lastname') {
            this.lname = event.target.value;
            console.log('this.lname>>', this.lname);
        } else if (event.target.name == 'emailaddress') {
            this.email = event.target.value;
            console.log('this.email>>', this.email);
        } else if (event.target.name == 'businessphone') {
            this.businessphn = event.target.value;
            console.log('this.businessphn>>', this.businessphn);
        } else if (event.target.name == 'mobilephone') {
            this.mobilephn = event.target.value;
            console.log('this.mobilephn>>', this.mobilephn);
        }
    }

    // run method on save click
    handleSave(event) {
        this.isSpinner = true;
        var file = this.newImgFile;

        if (file != undefined && this.deletePfp == false) {
            this.file = file;
            this.showLoadingSpinner = true;
            this.fileReader = new FileReader();
            this.fileReader.onloadend = (() => {
                this.fileContents = this.fileReader.result;
                let base64 = 'base64,';
                this.content = this.fileContents.indexOf(base64) + base64.length;
                this.fileContents = this.fileContents.substring(this.content);
                this.savePfp();
            });
            this.fileReader.readAsDataURL(this.file);
        } else if (this.deletePfp == true) {
            deleteFile({ userId: this.usrId });
            this.saveUserData();
        } else {
            this.saveUserData();
        }
    }

    // save new profile pic after save button click
    savePfp(event) {
        var pId = this.usrId;
        var file = this.file;
        var fileContents = this.fileContents;
        saveFile({
                userId: pId,
                fileId: file.Id,
                base64Data: encodeURIComponent(fileContents)
            })
            .then(result => {
                console.log({ result });
                if (result == 'Success') {
                    this.saveUserData();
                } else {
                    this.template.querySelector('c-ts_-tost-notification').showToast('error', 'Please Choose Other Image For Profile', 3000);
                    this.isSpinner = false;
                }
            })
            .catch(error => {
                this.template.querySelector('c-ts_-tost-notification').showToast('error', 'Something Went Wrong', 3000);
            });
    }

    // save all user data after click on save button
    saveUserData(event) {
        let usrObj = { 'sobjectType': 'User' };
        usrObj.Id = this.usrId;
        usrObj.FirstName = this.fname;
        usrObj.LastName = this.lname;
        usrObj.Email = this.email;
        usrObj.businessphn = this.businessphn;
        usrObj.mobilephn = this.mobilephn;
        saveData({ usr: usrObj })

        setTimeout(() => {
            this.getUsrData();
            this.isSpinner = false;
        }, 2000);
    }

    // show save and ancel button in only first tab
    handleActive(event) {
        const tab = event.target.value;;
        var btns = this.template.querySelector('.btns');
        if (tab == 'tab1') {
            btns.style.display = 'flex';
        } else {
            btns.style.display = 'none';
        }
    }

    // set view of new profile pic and store data
    savePfpHandle(event) {
        try {
            this.deletePfp = false;
            let file = event.target.files[0];
            this.newImgFile = file;
            this.newImgUrl = URL.createObjectURL(file);
        } catch (error) {
            this.template.querySelector('c-ts_-tost-notification').showToast('error', 'Something Went Wrong', 3000);
        }
    }

    // delete profile pic
    deletePfpHandle(event) {
        this.deletePfp = true;
        var pfpImage = this.template.querySelector('.profChangeImg');
        pfpImage.setAttribute('src', this.blankProgileImg);
    }

    // delete CV
    deleteCv(event) {;
        deleteRecord(this.cvId)
            .then((result) => {
                this.cvId = '';
                var cvData = this.template.querySelector('.cvData');
                cvData.style.display = 'none';
                this.template.querySelector('c-ts_-tost-notification').showToast('success', 'You CV is deleted', 3000);
            })
            .catch(error => {
                this.template.querySelector('c-ts_-tost-notification').showToast('error', 'Something Went Wrong', 3000);
            });
    }
}