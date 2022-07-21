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
    @track getCvName;
    file;
    fileContents;
    fileReader;
    content;

    @track checkClient;

    @track isShowModal = false;
    @track deleteIt = false;
    @track deleteCvId;



    connectedCallback() {
        this.getUsrData();
        this.fetchCon();

        getData()
            .then(result => {
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
            ]).then(() => {})
            .catch(error => {
                this.template.querySelector('c-ts_-tost-notification').showToast('error', 'Something Went Wrong', 3000);
            });
    }

    fetchCon() {

        try {
            fetchContact()
                .then(result => {
                    if (result != null) {
                        if (result.Community_Contact_Type__c == 'Client') {
                            this.checkClient = false;
                        } else {
                            this.checkClient = true;
                        }
                        this.isSpinner = false;
                    } else {

                    }
                })
                .catch(error => {});
        } catch (e) {
            this.reloadpage = true;
            this.template.querySelectorAll('c-ts_-error-component')[0].openModal();
        }
    }

    getUsrData(event) {
        this.loadCv();
    }

    // get cv from apex
    loadCv(evet) {
        getDocsData()
            .then(result => {
                if (result != null) {
                    this.cvList = result;
                }
                this.isSpinner = false;
            })
            .catch(error => {
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
            this.usrId = data.fields.Id.value;

        }
    }

    get acceptedFormats() {
        return ['.png', '.jpg', '.jpeg'];
    }

    // get data for upload CV
    handleFile(event) {
        try {

            this.isSpinner = true;
            let fileList = event.target.files;
            this.file = fileList[0];
            let firstClass = this.template.querySelector(`[data-id="cvUploader"]`);
            firstClass.value = '';
            this.fileReader = new FileReader();
            this.fileReader.onloadend = (() => {
                this.fileContents = this.fileReader.result;
                let base64 = 'base64,';
                this.content = this.fileContents.indexOf(base64) + base64.length;
                this.fileContents = this.fileContents.substring(this.content);
                this.cvUpload();
            });
            this.fileReader.readAsDataURL(this.file);
        } catch (error) {
            console.log({ error });
        }
    }

    // upload CV
    cvUpload(event) {
        var pId = this.usrId;
        var file = this.file;
        var fileContents = this.fileContents;
        saveCV({
                parentId: pId,
                fileName: file.name,
                base64Data: encodeURIComponent(fileContents)
            })
            .then(result => {
                this.isSpinner = false;
                this.template.querySelector('c-ts_-tost-notification').showToast('success', 'You CV is Uploaded', 3000);
                this.loadCv();
            })
            .catch(error => {
                this.template.querySelector('c-ts_-tost-notification').showToast('error', 'Something Went Wrong', 3000);
            });
    };

    // set input field data
    handleChange(event) {
        if (event.target.name == 'firstname') {
            this.fname = event.target.value;
        } else if (event.target.name == 'lastname') {
            this.lname = event.target.value;
        } else if (event.target.name == 'emailaddress') {
            this.email = event.target.value;
        } else if (event.target.name == 'businessphone') {
            this.businessphn = event.target.value;
        } else if (event.target.name == 'mobilephone') {
            this.mobilephn = event.target.value;
        }
    }

    // run method on save click
    handleSave(event) {
        try {
            this.isSpinner = true;
            var file = this.newImgFile;

            if (file != undefined && this.deletePfp == false) {
                this.file = file;
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

        } catch (e) {

            this.template.querySelector('c-ts_-tost-notification').showToast('error', 'Something Went Wrong', 3000);
            this.isSpinner = false; // sakina


        }
    }

    // cancel the updated changes _____Sakina 
    cancelChanges(event) {
        this.isSpinner = true;
        setTimeout(() => {
            getData()
                .then(result => {

                    this.fname = result.FirstName;
                    this.lname = result.LastName;
                    this.email = result.Email;
                    this.businessphn = result.Phone;
                    this.mobilephn = result.MobilePhone;
                    this.imgUrl = result.FullPhotoUrl;
                    this.newImgUrl = result.FullPhotoUrl;
                })

            this.isSpinner = false;
        }, 2000)
    }


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
                this.saveUserData();

            })
            .catch(error => {

                this.template.querySelector('c-ts_-tost-notification').showToast('error', 'Something Went Wrong', 3000);
                this.isSpinner = false;

            });
    }

    // save all user data after click on save button
    saveUserData(event) {
        try {
            let usrObj = { 'sobjectType': 'User' };
            usrObj.Id = this.usrId;
            usrObj.FirstName = this.fname;
            usrObj.LastName = this.lname;
            usrObj.Email = this.email;
            usrObj.Phone = this.businessphn;
            usrObj.MobilePhone = this.mobilephn;
            saveData({ usr: usrObj })


            setTimeout(() => {
                // this.getUsrData();

                getData()
                    .then(result => {


                        this.fname = result.FirstName;
                        this.lname = result.LastName;
                        this.email = result.Email;
                        // resultss.Email = this.email;
                        this.businessphn = result.Phone;
                        this.mobilephn = result.MobilePhone;
                        this.imgUrl = result.FullPhotoUrl;
                        this.newImgUrl = result.FullPhotoUrl;

                    })
                this.template.querySelector('c-ts_-tost-notification').showToast('success', 'Your data is save successfully', 3000);
                this.isSpinner = false;

            }, 2000);
        } catch (error) {
            // sakina
            this.template.querySelector('c-ts_-tost-notification').showToast('error', 'Something Went Wrong', 3000);
            this.isSpinner = false;
            // sakina



        }
    }

    // show save and ancel button in only first tab
    handleActive(event) {
        const tab = event.target.value;;
        var btns = this.template.querySelector('.btns');
        if (tab == 'tab1') {
            btns.style.display = 'flex';
        } else {
            btns.style.display = 'none'
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

    // sakina
    hideModalBox() {
        this.isShowModal = false;
        this.deleteIt = false;

    }

    // confirmbox
    yesDelete(event) {
            this.deleteIt = true;
            this.isShowModal = false;
            this.isSpinner = true;
            deleteRecord(this.deleteCvId)
                .then((result) => {
                    this.template.querySelector('c-ts_-tost-notification').showToast('success', 'You CV is deleted', 3000);
                    this.loadCv();
                })
                .catch(error => {
                    this.template.querySelector('c-ts_-tost-notification').showToast('error', 'Something Went Wrong', 3000);
                });

            this.deleteIt = false;
        }
        // delete CV
    deleteCv(event) {
        this.isShowModal = true;
        var cvId = event.target.name;
        var getName = event.target.title;
        this.getCvName = getName;
        this.deleteCvId = cvId;
    }
}
// sakina