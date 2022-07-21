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
import fetchContact from '@salesforce/apex/ts_ProfilePageController.fetchContact';
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
    @track cvList;
    file;
    fileContents;
    fileReader;
    content;

    @track checkClient;

    connectedCallback() {
        this.getUsrData();
        this.fetchCon();

        getData()
            .then(result => {
                console.log({ result });
                this.fname = result.FirstName;
                this.lname = result.LastName;
                this.email = result.Email;
                this.businessphn = result.Phone;
                this.mobilephn = result.MobilePhone;
                this.imgUrl = result.FullPhotoUrl;
                this.newImgUrl = result.FullPhotoUrl;
            })

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

    fetchCon() {

        try {
            fetchContact()
                .then(result => {
                    if (result != null) {
                        console.log({ result });
                        if (result.Community_Contact_Type__c == 'Client') {
                            this.checkClient = false;
                        } else {
                            this.checkClient = true;
                        }
                        this.isSpinner = false;
                    } else {
                        console.log('Contact null');
                        console.log({ result });
                    }
                })
                .catch(error => {
                    console.log({ error });
                });
        } catch (e) {
            this.reloadpage = true;
            this.template.querySelectorAll('c-ts_-error-component')[0].openModal();
        }
    }

    getUsrData(event) {
        console.log('First time');
        // getData()
        //     .then(result => {
        //         console.log({ result });
        //         this.fname = result.FirstName;
        //         this.lname = result.LastName;
        //         this.email = result.Email;
        //         this.businessphn = result.businessphn;
        //         this.mobilephn = result.mobilephn;
        //         this.imgUrl = result.FullPhotoUrl;
        //         this.newImgUrl = result.FullPhotoUrl;
        //     })
        this.loadCv();
        // console.log('---------------------' + usrObj.FirstName + usrObj.businessphn);
        console.log('******************************' + this.fname + this.businessphn);
    }

    // get cv from apex
    loadCv(evet) {
        getDocsData()
            .then(result => {
                console.log({ result });
                if (result != null) {
                    this.cvList = result;
                }
                this.isSpinner = false;
            })
            .catch(error => {
                console.log({ error });
                this.isSpinner = false;
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
                this.isSpinner = false;
                this.loadCv();
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
        usrObj.phone = this.businessphn;
        usrObj.MobilePhone = this.mobilephn;
        saveData({ usr: usrObj })




        setTimeout(() => {
            this.getUsrData();
            this.isSpinner = false;
        }, 2000);

        console.log(usrObj.MobilePhone);
        console.log('================>===========>==============');
        console.log(usrObj);



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
    deleteCv(event) {
        this.isSpinner = true;
        var cvId = event.target.name;
        console.log({ cvId });
        deleteRecord(cvId)
            .then((result) => {
                this.template.querySelector('c-ts_-tost-notification').showToast('success', 'You CV is deleted', 3000);
                this.loadCv();
            })
            .catch(error => {
                this.template.querySelector('c-ts_-tost-notification').showToast('error', 'Something Went Wrong', 3000);
            });
    }
}