import { LightningElement,track,wire} from 'lwc';
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


export default class Ts_ProfilePage extends LightningElement {

    profImg = profileImg;
    settingImg = settingIcon;
    dragFileImg = dragFileIcon;
 
    @track imgUrl;
    @track usrId;
    @track fname;
    @track lname;
    @track email;
    @track businessphn;
    @track mobilephn;

    @track isLoaded;
    connectedCallback(){
        this.getUsrData();
    }

    renderedCallback() {
        Promise.all([
                loadStyle(this, profilePageCss)
            ]).then(() => {
                console.log('Files loaded');
            })
            .catch(error => {
                console.log(error.body.message);
            });
    }

    getUsrData(event){
        console.log('First time');
        getData()
            .then(result => {
                console.log({result});
                this.fname = result.FirstName;
                this.lname = result.LastName;
                this.email = result.Email;
                this.Phone = result.businessphn;
                this.MobilePhone = result.mobilephn;
                this.imgUrl = result.FullPhotoUrl;
            })
    }

    @wire(getRecord, {
        recordId: USER_ID,
        fields:[USRID]
    }) wireuser({
        error,
        data
    }) {
        if (error) {
           this.error = error ; 
        } else if (data) {
            console.log('indatas');
            this.usrId = data.fields.Id.value;
            
        }
    }

    get acceptedFormats() {
        
        return ['.png','.jpg','.jpeg'];
    }

    saveFileHandle(event){
        let fileList = event.detail.files;
        console.log('length>>',fileList.length);
        var target = event.target.name;
        console.log({fileList});
            
        [...fileList].forEach(file => {
            console.log({file});
            let fileReader = new FileReader();
            file.sObjectId = this.usrId;

            var sId = file.sObjectId;
            fileReader.onload = function() {
                let fileContents = fileReader.result;
                let base64Mark = 'base64,';
                let dataStart = fileContents.indexOf(base64Mark) + base64Mark.length;
                fileContents = fileContents.substring(dataStart);
                console.log('this.recordId>>',sId);
                saveFile({
                    userId: sId,
                    fileId : file.Id,
                    base64Data: encodeURIComponent(fileContents)
                })
                .then(result => {
                    alert('Sucess');
                    
                })
                .catch(error => {
                    console.log({error});
                });
            };
            fileReader.readAsDataURL(file);
            
        });
        this.isLoaded = true;
        setTimeout(() => {
            this.getUsrData();
            this.isLoaded = false;
        },1500);
    }

    handleFile(event){
        console.log({event});
        let fileList = event.detail.files;
        console.log('length>>',fileList.length);
        var target = event.target.name;
        console.log({fileList});
    
        [...fileList].forEach(file => {
            let fileReader = new FileReader();
            file.sObjectId = this.recordId;

            var sId = file.sObjectId;
            console.log({sId});
            fileReader.onload = function() {
                let fileContents = fileReader.result;
                let base64Mark = 'base64,';
                let dataStart = fileContents.indexOf(base64Mark) + base64Mark.length;
                fileContents = fileContents.substring(dataStart);
                console.log('this.recordId>>',sId);
                saveCV({
                    parentId: sId,
                    fileName: file.name,
                    base64Data: encodeURIComponent(fileContents)
                })
                .then(result => {
                    // alert('Sucess');
                   
                })
                .catch(error => {
                    alert('Error');
                });
            };
            fileReader.readAsDataURL(file);
            console.log('fl>>',fileList.length);
            
            alert('File Uploaded Successfully');
                        
        });
    }

    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        alert('No. of files uploaded : ' + uploadedFiles.length);
    }

    handleChange(event){

        console.log('usr>>',this.usrId);
        if(event.target.name == 'firstname'){
            this.fname = event.target.value;
            console.log('this.fname>>',this.fname);
        }
        else if(event.target.name == 'lastname'){
            this.lname = event.target.value;
            console.log('this.lname>>',this.lname);
        }
        else if(event.target.name == 'emailaddress'){
            this.email = event.target.value;
            console.log('this.email>>',this.email);
        }
        else if(event.target.name == 'businessphone'){
            this.businessphn = event.target.value;
            console.log('this.businessphn>>',this.businessphn);
        }
        else if(event.target.name == 'mobilephone'){
            this.mobilephn = event.target.value;
            console.log('this.mobilephn>>',this.mobilephn);
        }
    }
    handleSave(event){

        let usrObj = { 'sobjectType': 'User' };
        usrObj.FirstName = this.fname;
        usrObj.LastName = this.lname;
        usrObj.Email = this.email;
        usrObj.Phone = this.businessphn;
        usrObj.MobilePhone = this.mobilephn;
        saveData({usr : usrObj})
            .then(result => {
                console.log({result});
            })

    }

}