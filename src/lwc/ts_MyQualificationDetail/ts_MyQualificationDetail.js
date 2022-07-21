import { LightningElement,api, track, wire} from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import TR1__Associated_Qualification__c from '@salesforce/schema/TR1__Associated_Qualification__c'; 
import Permanent_Right_to_Work_in_UK__c from '@salesforce/schema/TR1__Associated_Qualification__c.Permanent_Right_to_Work_in_UK__c';
import Documents__c from '@salesforce/schema/TR1__Associated_Qualification__c.Documents__c';
import OverseasPolicecheck from '@salesforce/schema/TR1__Associated_Qualification__c.Overseas_Police_Check__c'; 
import OTQQualifications from '@salesforce/schema/TR1__Associated_Qualification__c.Overseas_Police_Check__c';
import Qualification_Type2__c from '@salesforce/schema/TR1__Associated_Qualification__c.Qualification_Type2__c';
import Qualification_Type__c from '@salesforce/schema/TR1__Associated_Qualification__c.Qualification_Type__c';
import NARICApprove from '@salesforce/schema/TR1__Associated_Qualification__c.NARIC_Approved__c';
import Group1IdType from '@salesforce/schema/TR1__Associated_Qualification__c.Group_1_ID_Type__c';
import Group2AIdType from '@salesforce/schema/TR1__Associated_Qualification__c.Group_2a_ID_Type__c';
import Group2bIdType from '@salesforce/schema/TR1__Associated_Qualification__c.Group_2b_ID_Type__c';
import NameChangeDocument from '@salesforce/schema/TR1__Associated_Qualification__c.Name_Change_Document__c';
import Update_Service_Status_Check__c from '@salesforce/schema/TR1__Associated_Qualification__c.Update_Service_Status_Check__c';
// import Ref1Type from '@salesforce/schema/TR1__Associated_Qualification__c.Reference_1_Type__c';
import Ref1Rating from '@salesforce/schema/TR1__Associated_Qualification__c.Reference_1_Rating__c';
// import Ref2Type from '@salesforce/schema/TR1__Associated_Qualification__c.Reference_2_Type__c';
import Ref2Rating from '@salesforce/schema/TR1__Associated_Qualification__c.Reference_2_Rating__c';
// import Ref3Type from '@salesforce/schema/TR1__Associated_Qualification__c.Reference_3_Type__c';
import Ref3Rating from '@salesforce/schema/TR1__Associated_Qualification__c.Reference_3_Rating__c';
import { CurrentPageReference } from 'lightning/navigation';
import Qualificationcss from '@salesforce/resourceUrl/Qualificationcss';
import getContactId from '@salesforce/apex/ts_MyQualificationDetailController.getContactId';
import editQuali from '@salesforce/apex/ts_MyQualificationDetailController.editQuali';
import saveCV from '@salesforce/apex/ts_MyQualificationDetailController.saveCV';
import getDocsData from '@salesforce/apex/ts_MyQualificationDetailController.getDocsData';
import Choice_of_Country__c from '@salesforce/schema/TR1__Associated_Qualification__c.Choice_of_Country__c';
import saveIcon from '@salesforce/resourceUrl/saveIcon';
import cancelIcon from '@salesforce/resourceUrl/cancelIcon';
import commstyle from '@salesforce/resourceUrl/CommunityCSS';
import communityicon from '@salesforce/resourceUrl/communityicons';
import dragFileIcon from '@salesforce/resourceUrl/dragFileIcon';
import USRID from '@salesforce/schema/User.Id';
import { deleteRecord } from 'lightning/uiRecordApi';


export default class Ts_MyQualificationDetail extends LightningElement {


    dragFileImg = dragFileIcon;
    deleteImg = communityicon + '/communityicons/delete.png';

    saveImg = saveIcon;
    cancelImg = cancelIcon;

    @track qName;
    @track contactId;

    @track cvId = '';

    @track cvList = [];

    //For Spinner
    @track isSpinner;

    // For Reload Page
    @track reloadpage;
    
    //For Result
    @track isResult;

    //For Hide/Show
    @track checkId;
    @track checkRtw;
    @track checkteacherQual;
    @track checkoverPc;
    @track checkoverTQ;
    @track checkCv;
    @track checkSafe;
    @track checkEme;
    @track checkDbs;
    @track checkPost16;
    @track checkEarly;
    @track checkSupport;
    @track checkInt;
    @track checkBarred;
    @track checkRefs;
    @track checkUpload;

    @track qualification= '';
    @track lstOptions = [];
    @track docOptions = [];

    docslst2 = [];

    @track l_All_Types;

    @track contactId;

    @track s = '';

    //For CV
    @track gapsExplanation;
    @track cvSubmitted;
    @track cvReceived;


    //For Perm Qualification
    @track nctlNum;
    @track setNum;
    @track qtls;

    //For Right to work
    @track workPermit;
    docs = [];
    @track workpermitdate;

    //For Overseas Teacher qualification
    @track naricApproveOps = [];

    @track OTQQFtypeval;
    @track naricApprove;
    @track otstranum;
    @track OTQteacherQualification = '';


    //For teacher qualification
    @track teacherQFTypeOptions = [];
    @track teacherQualifications = [];

    @track teacherQftype;
    @track teacherDualVal = '';
    @track tranum;

    //For Overseas police check
    @track overseasPoliceOps = [];
    @track overseasVal;
    @track opcStdate;
    @track opcEddate;

    @track teacherQualificationsOver = [];

    //For Id Qualification
    @track groupTypes = [];
    @track nameChangeDocuments = [];
    @track Group2aIdTypes = [];
    @track Group2bIdTypes = [];

    @track group1IdTypeVal;
    @track namechangedocument;
    @track Group2aIdType1 = '';
    @track Group2bIdType1 = '';

    //For safeguarding
    @track safegDate;

    //for emergency contact
    @track eContactName;
    @track eConMobile;
    @track eConWork;
    @track Relate;
    @track eConHome;
    @track eConAdd;

     //for dbs
    @track dbNum;
    @track dbsUpdateSer;
    @track dbsOptions;

    //for post 16 qualificaitons
    @track snumb;
    @track qValue;
    @track qList = [];
    @track expirDate;
    @track QtlsCheck;
    @track qualmultipick = '';
    @track qualopt = [];

    @track qualificationsPost16 = []

    //For international

    @track choiceOfCountryOps = [];

    @track country = '';
    @track seekIntPos;

    //For Early Year qualification

    @track earlyYearQFtype;
    @track earlyYearQualifications = '';

    @track teacherQualificationsEarly = [];

    //For Support Qualification

    @track supportQFtype;
    @track supportQualifications = '';

    @track teacherQualificationsSupport = [];

    //For Barred List

    @track barredcheckurl;
    @track barredListResult;
    @track ewscheckeddate;
    @track ewsnextcheckeddate;
    @track barredlistdatecheck;
    @track barredlistexpirydate;
    @track DOB

    //References

    @track Ref1Types = [];
    @track Ref2Types = [];
    @track Ref3Types = [];
    @track Ref1Ratings = [];
    @track Ref2Ratings = [];
    @track Ref3Ratings = [];

    @track Ref1sentdate;
    @track Reference1name;
    @track Reference1RecDate;
    @track Reference1phone;
    @track Reference1daterangestart;
    @track Reference1email;
    @track Reference1daterangeend;
    @track Ref1Type;
    @track Ref1Rec;
    @track Ref1Rating;
    @track Ref2sentdate;
    @track Reference2name;
    @track Ref1recdate;
    @track Ref2phone;
    @track Ref2daterangest;
    @track Ref2email;
    @track Ref2daterangeend;
    @track Ref2Type;
    @track Ref2rec;
    @track Ref2Rating;
    @track Ref3sentdate;
    @track Reference3Name;
    @track Ref3revdate;
    @track Reference3phone;
    @track Ref3daterangest;
    @track Ref3email;
    @track Ref3dtrangeend;
    @track Ref3type;
    @track Ref3received;
    @track Ref3rating

    @track urlName = '';

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
       if (currentPageReference) {
          this.urlStateParameters = currentPageReference.state;
          this.setParametersBasedOnUrl();
       }
    }

    setParametersBasedOnUrl() {
       this.urlName = this.urlStateParameters.qualification || null;
    //    this.urlName = 'Photo';
       console.log('this.urlName>>',this.urlName);
    }

    // Get Object Info.
    @wire (getObjectInfo, {objectApiName: TR1__Associated_Qualification__c})
    qualObjectInfo;

    // Get Picklist values.
   

    @wire(getPicklistValues, {recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId', fieldApiName: Documents__c})
    documents(data, error){
        if(data && data.data && data.data.values){
            this.documentTypes = data;
            data.data.values.forEach( objPicklist => {
                this.docOptions.push({
                    label: objPicklist.label,
                    value: objPicklist.value
                });
            });
        } else if(error){
            console.log(error);
        }
    };

    @wire(getPicklistValues,
        {
            recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId',
            fieldApiName: Permanent_Right_to_Work_in_UK__c
        }
    )
    workRightToWorkValues(data,error){
        
        if(data && data.data && data.data.values){
            let options = [];
            data.data.values.forEach( objPicklist => {
                options.push({ label: objPicklist.value, value: objPicklist.value});
            });
            this.lstOptions = options;
            
        } else if(error){
            console.log(error);
        }
    };

    //get picklist for overseas police check
    @wire(getPicklistValues,
        {
            recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId',
            fieldApiName: OverseasPolicecheck
        }
    )
    workRightValues(data,error){
        
        if(data && data.data && data.data.values){
            let options = [];
            data.data.values.forEach( objPicklist => {
                options.push({ label: objPicklist.value, value: objPicklist.value});
            });
            this.overseasPoliceOps = options;
            
        } else if(error){
            console.log(error);
        }
    };

    //Get picklist values for overseas teacher qualification
    @wire(getPicklistValues,
        {
            recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId',
            fieldApiName: NARICApprove
        }
    )
    
    overseasteacherOps(data,error){
        if(data && data.data && data.data.values){
            let options = [];
            data.data.values.forEach( objPicklist => {
                options.push({ label: objPicklist.value, value: objPicklist.value});
            });
            this.naricApproveOps = options;
            console.log('this.naricApproveOps>>',this.naricApproveOps);
        } else if(error){
            console.log(error);
        }
    };

    //Get picklist values for teacher Qualification types
    @wire(getPicklistValues,
        {
            recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId',
            fieldApiName: Qualification_Type2__c
        }
    )
    
    teacherQFTypeVal(data,error){
        if(data && data.data && data.data.values){
            let options = [];
            
            data.data.values.forEach( objPicklist => {
                options.push({ label: objPicklist.value, value: objPicklist.value});
            });
            this.teacherQFTypeOptions = options;
            console.log('this.teacherQFTypeOptions>>',this.teacherQFTypeOptions);
        } else if(error){
            console.log(error);
        }
    };


    //Get picklist values for Teacher qualifications
    @wire(getPicklistValues,
         {recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId',
          fieldApiName: Qualification_Type__c
        }
    )

    teacherQualificationsVal(data, error){
        
        if(data && data.data && data.data.values){
            this.qualTypes = data;
            data.data.values.forEach( objPicklist => {
                
                this.teacherQualifications.push({
                    label: objPicklist.label,
                    value: objPicklist.value
                });
                this.teacherQualificationsOver.push({
                    label: objPicklist.label,
                    value: objPicklist.value
                });
                this.teacherQualificationsEarly.push({
                    label: objPicklist.label,
                    value: objPicklist.value
                });
                this.teacherQualificationsSupport.push({
                    label: objPicklist.label,
                    value: objPicklist.value
                });
                this.qualificationsPost16.push({
                    label: objPicklist.label,
                    value: objPicklist.value
                });
            });
            console.log('this.teacherQualifications>>>',this.teacherQualifications);
        } else if(error){
            console.log(error);
        }
    };

    //Get picklist values for groupIdtype
    @wire(getPicklistValues,
        {
            recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId',
            fieldApiName: Group1IdType
        }
    )
    groupTypeIdOptions(data,error){
        if(data && data.data && data.data.values){
            let options = [];
            data.data.values.forEach( objPicklist => {
                options.push({ label: objPicklist.value, value: objPicklist.value});
            });
            this.groupTypes = options;
            console.log('this.groupTypes>>',this.groupTypes);
        } else if(error){
            console.log(error);
        }
    };

    //Get picklist values for NameChangeDocument
    @wire(getPicklistValues,
        {
            recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId',
            fieldApiName: NameChangeDocument
        }
    )
    nameChangeDocumentsValues(data,error){
        if(data && data.data && data.data.values){
            let options = [];
            data.data.values.forEach( objPicklist => {
                options.push({ label: objPicklist.value, value: objPicklist.value});
            });
            this.nameChangeDocuments = options;
            
        } else if(error){
            console.log(error);
        }
    };

    //Get picklist values for Group2aIdtype
    @wire(getPicklistValues, {recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId', fieldApiName: Group2AIdType})
    groupTypesValues(data, error){
        
        if(data && data.data && data.data.values){
            data.data.values.forEach( objPicklist => {
        
                this.Group2aIdTypes.push({
                    label: objPicklist.label,
                    value: objPicklist.value
                });
            });
            console.log('this.Group2aIdTypes>>>',this.Group2aIdTypes);
        } else if(error){
            console.log(error);
        }
    };

    //Get picklist values for Group2bIdtype
    @wire(getPicklistValues, {recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId', fieldApiName: Group2bIdType})
    languages(data, error){
        if(data && data.data && data.data.values){
            data.data.values.forEach( objPicklist => {
                this.Group2bIdTypes.push({
                    label: objPicklist.label,
                    value: objPicklist.value
                });
            });
            console.log('this.Group2bIdTypes>>>',this.Group2bIdTypes);
        } else if(error){
            console.log(error);
        }
    };

     //get picklist for dbs
     @wire(getPicklistValues,
        {
            recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId',
            fieldApiName: Update_Service_Status_Check__c
        }
    )
    updateStatusCheck(data, error) {
        console.log({ data });
        if (data && data.data && data.data.values) {
            let options = [];
            data.data.values.forEach(objPicklist => {
                options.push({ label: objPicklist.value, value: objPicklist.value });
            });
            this.dbsOptions = options;

        } else if (error) {
            console.log(error);
        }
    };

     //get picklist for post 16 qualifications
     @wire(getPicklistValues,
        {
            recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId',
            fieldApiName: Qualification_Type2__c
        }
    )
    qualificationType(data, error) {
        console.log({ data });
        if (data && data.data && data.data.values) {
            let options11 = [];
            data.data.values.forEach(objPicklist => {
                options11.push({ label: objPicklist.value, value: objPicklist.value });
            });
            this.qList = options11;

        } else if (error) {
            console.log(error);
        }
    };

     // for multi picklist
     @wire(getPicklistValues,
        {
            recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId',
            fieldApiName: Qualification_Type__c
        }
    )
    qualificationTypee(data, error) {
        console.log({ data });
        if (data && data.data && data.data.values) {
            let options = [];
            data.data.values.forEach(objPicklist => {
                options.push({ label: objPicklist.value, value: objPicklist.value });
            });
            this.qualopt = options;

        } else if (error) {
            console.log(error);
        }
    };

    //for international qulification

    @wire(getPicklistValues,
        {
            recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId',
            fieldApiName: Choice_of_Country__c
        }
    )
    qualificationTypee(data, error) {
        console.log({ data });
        if (data && data.data && data.data.values) {
            let options = [];
            data.data.values.forEach(objPicklist => {
                options.push({ label: objPicklist.value, value: objPicklist.value });
            });
            this.choiceOfCountryOps = options;

        } else if (error) {
            console.log(error);
        }
    };

    //For References

    
    // @wire(getPicklistValues,
    //     {
    //         recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId',
    //         fieldApiName: Ref1Type
    //     }
    // )
    // groupTypeOptions(data,error){
    //     if(data && data.data && data.data.values){
    //         let options = [];
    //         data.data.values.forEach( objPicklist => {
    //             options.push({ label: objPicklist.value, value: objPicklist.value});
    //         });
    //         this.Ref1Types = options;
    //         console.log('this.Ref1Types>>',this.Ref1Types);
    //     } else if(error){
    //         console.log(error);
    //     }
    // };

    @wire(getPicklistValues,
        {
            recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId',
            fieldApiName: Ref1Rating
        }
    )
    groupTypeOptions(data,error){
        if(data && data.data && data.data.values){
            let options = [];
            data.data.values.forEach( objPicklist => {
                options.push({ label: objPicklist.value, value: objPicklist.value});
            });
            this.Ref1Ratings = options;
            console.log('this.Ref1Ratings>>',this.Ref1Ratings);
        } else if(error){
            console.log(error);
        }
    };

    // @wire(getPicklistValues,
    //     {
    //         recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId',
    //         fieldApiName: Ref2Type
    //     }
    // )
    // groupTypeOptions(data,error){
    //     if(data && data.data && data.data.values){
    //         let options = [];
    //         data.data.values.forEach( objPicklist => {
    //             options.push({ label: objPicklist.value, value: objPicklist.value});
    //         });
    //         this.Ref2Types = options;
    //         console.log('this.Ref2Types>>',this.Ref2Types);
    //     } else if(error){
    //         console.log(error);
    //     }
    // };

    @wire(getPicklistValues,
        {
            recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId',
            fieldApiName: Ref2Rating
        }
    )
    groupTypeOptions(data,error){
        if(data && data.data && data.data.values){
            let options = [];
            data.data.values.forEach( objPicklist => {
                options.push({ label: objPicklist.value, value: objPicklist.value});
            });
            this.Ref2Ratings = options;
            console.log('this.Ref2Ratings>>',this.Ref2Ratings);
        } else if(error){
            console.log(error);
        }
    };

    // @wire(getPicklistValues,
    //     {
    //         recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId',
    //         fieldApiName: Ref3Type
    //     }
    // )
    // groupTypeOptions(data,error){
    //     if(data && data.data && data.data.values){
    //         let options = [];
    //         data.data.values.forEach( objPicklist => {
    //             options.push({ label: objPicklist.value, value: objPicklist.value});
    //         });
    //         this.Ref3Types = options;
    //         console.log('this.Ref3Types>>',this.Ref3Types);
    //     } else if(error){
    //         console.log(error);
    //     }
    // };

    @wire(getPicklistValues,
        {
            recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId',
            fieldApiName: Ref3Rating
        }
    )
    groupTypeOptions(data,error){
        if(data && data.data && data.data.values){
            let options = [];
            data.data.values.forEach( objPicklist => {
                options.push({ label: objPicklist.value, value: objPicklist.value});
            });
            this.Ref3Ratings = options;
            console.log('this.Ref3Ratings>>',this.Ref3Ratings);
        } else if(error){
            console.log(error);
        }
    };

    connectedCallback(){
        this.isSpinner = true;
        console.log('qualificationname>>>'+this.qualification); 
        this.checkUrl();
        this.getConId();
        
        this.isSpinner = false;
    }

    currentPageReference = null; 
    urlStateParameters = null;

    

    getDocData(){
        console.log('in doc data');
        console.log('this.contactId22>>>',this.contactId);
        console.log('this.urlName21>>',this.urlName);
        getDocsData({
            parentId: this.contactId,
            description : this.urlName
        }).then(result =>{
            console.log('get doc data res>>');
            this.cvList = result;
            console.log({result});
            console.log('this.cvList>>>',this.cvList);
        })
        .catch(error => {
            console.log({error});
        })
    }
        
    
    checkUrl(){
        if(this.urlName == 'CV'){
            this.checkCv = true;
        }
        else if(this.urlName == 'Right to Work'){
            this.checkRtw = true;
        }
        else if(this.urlName == 'Teacher Qualification'){
            this.checkteacherQual = true;
        }
        else if(this.urlName == 'Overseas Police Check'){
            this.checkoverPc = true;
        }
        else if(this.urlName == 'Overseas Teacher Qualifications'){
            this.checkoverTQ = true;
        }
        else if(this.urlName == 'ID'){
            this.checkId = true;
        }
        else if(this.urlName == 'Safeguarding'){
            this.checkSafe = true;
        }
        else if(this.urlName == 'Emergency Contact'){
            this.checkEme = true;
        }
        else if(this.urlName == 'DBS'){
            this.checkDbs = true;         
        }
        else if(this.urlName == 'Post 16 Qualifications'){
            this.checkPost16 = true;
        }
        else if(this.urlName == 'Early Years Qualifications'){
            this.checkEarly = true;
        }
        else if(this.urlName == 'Support Qualifications'){
            this.checkSupport = true;
        }
        else if(this.urlName == 'International'){
            this.checkInt = true;
        }
        else if(this.urlName == 'Barred List'){
            this.checkBarred = true;
        }
        else if(this.urlName == 'References'){
            this.checkRefs = true;
        }
        else if(this.urlName == 'Photo'){
            this.checkUpload = true;
        }
    }

    getConId(){

        getContactId()
            .then(result => {
                console.log({result});
                this.contactId = result;
                this.getDocData();
            })
        
    }

    handleUpsellChange(event) {
        console.log('ini upsell');
        console.log({event});
        console.log('et>>',event.target.value);
        console.log('his.qualTypes>>',this.qualTypes);
        if(event.target.name == 'teacherQftype'){
            let key = this.qualTypes.data.controllerValues[event.target.value];
            this.teacherQualifications = this.qualTypes.data.values.filter(opt => opt.validFor.includes(key));
        }
        else if(event.target.name == 'OTQQFtypeval'){            
            let key = this.qualTypes.data.controllerValues[event.target.value];
            this.teacherQualificationsOver = this.qualTypes.data.values.filter(opt => opt.validFor.includes(key));
        }
        else if(event.target.name == 'earlyYearQFtype'){
            let key = this.qualTypes.data.controllerValues[event.target.value];
            this.teacherQualificationsEarly = this.qualTypes.data.values.filter(opt => opt.validFor.includes(key));
        }    
        else if(event.target.name == 'supportQFtype'){
            let key = this.qualTypes.data.controllerValues[event.target.value];
            this.teacherQualificationsSupport = this.qualTypes.data.values.filter(opt => opt.validFor.includes(key));
        }
        else if(event.target.name == 'quList'){
            let key = this.qualTypes.data.controllerValues[event.target.value];
            this.qualificationsPost16 = this.qualTypes.data.values.filter(opt => opt.validFor.includes(key));
        }
        else if(event.target.name == 'workPermit'){
            console.log('in workpermit');
            this.workPermit = event.target.value;
            console.log('this.workPermit in upsell>>',this.workPermit);
            let key = this.documentTypes.data.controllerValues[event.target.value];
            this.docOptions = this.documentTypes.data.values.filter(opt => opt.validFor.includes(key));
            console.log('this.docOptions>>',this.docOptions);
        }
    }

    onPrevious(){
        // window.open('https://mvcdev-supplydesk.cs110.force.com/s/profile');
        var url = window.location.origin; 
        url= url+'/s/profile';
        console.log(url);
        window.open(url, '_self');
    }

    //On change file
    handleFile(event) {
        var cvId = this.cvId;
        console.log({cvId});
        this.qName = event.target.name;
        console.log('this.qName>>>',this.qName);
        
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
        console.log({file});
        var fileContents = this.fileContents;
        saveCV({
                parentId: this.contactId,
                description: this.qName,
                fileName: file.name,
                base64Data: encodeURIComponent(fileContents)
            })
            .then(result => {

                console.log('in save cv');
                console.log({ result });
                this.cvId = result[0];
                this.cvName = result[1];
                this.getDocData();
                this.isSpinner = false;
                this.template.querySelector('c-ts_-tost-notification').showToast('success', 'Proof Added Successfully', 3000);
            })
            .catch(error => {
                console.log({error});
                this.template.querySelector('c-ts_-tost-notification').showToast('error', 'Something Went Wrong', 3000);
            });
    };

    // delete CV
    deleteCv(event) {
        var cvId = event.target.name;
        console.log({cvId});
        deleteRecord(cvId)
            .then((result) => {
                this.template.querySelector('c-ts_-tost-notification').showToast('success', 'Your Proof is deleted', 3000);
                this.getDocData();
            })
            .catch(error => {
                this.template.querySelector('c-ts_-tost-notification').showToast('error', 'Something Went Wrong', 3000);
            });
    }

    handleChange(event){

        console.log({event});
        if(this.urlName == 'CV'){
            if(event.target.name == 'gapsExp'){
                this.gapsExplanation = event.target.value;
                console.log('this.gapsExplanation>>',this.gapsExplanation);
            }
            else if(event.target.name == 'cvSub'){
                this.cvSubmitted = event.target.checked;       
                console.log('this.cvSubmitted>>',this.cvSubmitted);
            }
            else if(event.target.name == 'cvrec'){
                this.cvReceived = event.target.checked;
            }
        }
        else if(this.urlName == 'Perm Qualification'){
            console.log('In perm change');
            if(event.target.name == 'nctlNum'){
                this.nctlNum = event.target.value;
                console.log('this.nctlNum>>>',this.nctlNum);
            }
            else if(event.target.name == 'setNum'){
                this.setNum = event.target.value;
                console.log('this.setNum>>>',this.setNum);
            }
            else if(event.target.name == 'qtls'){
                this.qtls = event.target.checked;
                console.log('this.qtls>>',this.qtls);
            }
        }
        else if(this.urlName == 'Right to Work'){
            console.log('Right To Work');
            if(event.target.name == 'workPermit'){
                // this.workPermit = event.detail.value;
                // console.log('this.workPermit>>>',this.workPermit);
            }
            else if(event.target.name == 'rtwdocs'){
                
                this.docs = event.detail.value;
                const docslst = Object.assign({}, this.docs);
                console.log('docslst>>',docslst);
                for(var k in docslst){
                    this.s += docslst[parseInt(k)]+';';
                }                
                console.log('s>>',this.s);                
            }
            else if(event.target.name == 'workpermitdate'){
                this.workpermitdate = event.target.value;
                console.log('this.workpermitdate>>>',this.workpermitdate);
            }
        }
        else if(this.urlName == 'Teacher Qualification'){
            
            if(event.target.name == 'tranum'){
                this.tranum = event.target.value;
            }
            else if(event.target.name == 'teacherQftype'){
                this.teacherQftype = event.target.value;
            }
            else if(event.target.name == 'teacherDualVal'){

                this.tcqs = event.detail.value;
                console.log('detail>>',event.detail.value);
                const dc = Object.assign({}, this.tcqs);
                console.log('docslst>>',dc);
                for(var k in dc){
                    console.log({k});
                    console.log('dk>>',dc[parseInt(k)]);
                    this.teacherDualVal += dc[parseInt(k)]+';';
                }   
            }
        }
        else if(this.urlName == 'Overseas Police Check'){
            
            if(event.target.name == 'overseasname'){
                this.overseasVal = event.target.value;
            }
            else if(event.target.name == 'opcStdate'){
                this.opcStdate = event.target.value;
            }
            else if(event.target.name == 'opcEddate'){
                this.opcEddate = event.target.value;
            }
        }

        else if(this.urlName == 'Overseas Teacher Qualifications'){

            if(event.target.name == 'OTQQFtypeval'){
                this.OTQQFtypeval = event.target.value;
            }
            else if(event.target.name == 'naricApprove'){
                this.naricApprove = event.target.value;
            }
            else if(event.target.name == 'otstranum'){
                this.otstranum = event.target.value;
            }
            else if(event.target.name == 'OTQteacherQualification'){

                const docslst = Object.assign({}, event.detail.value);
                console.log('docslst>>',docslst);
                for(var k in docslst){
                    this.OTQteacherQualification += docslst[parseInt(k)]+';';
                } 
            }
        }

        else if(this.urlName == 'ID'){

            if(event.target.name == 'group1IdType'){
                this.group1IdTypeVal = event.target.value;
                console.log('this.group1IdTypeVal>>',this.group1IdTypeVal);
            }
            else if(event.target.name == 'namechangedocument'){
                this.namechangedocument = event.target.value;
                console.log('this.namechangedocument>>',this.namechangedocument);
            }
            else if(event.target.name == 'group2aIdType'){

                const docslstG1 = Object.assign({}, event.detail.value);
                console.log('docslst>>',docslstG1);
                for(var k in docslstG1){
                    this.Group2aIdType1 += docslstG1[parseInt(k)]+';';
                }                
                console.log('this.group2aIdType>>',this.Group2aIdType1);
                
            }
            else if(event.target.name == 'group2bIdType'){
                
                const docslstG2 = Object.assign({}, event.detail.value);
                console.log('docslst>>',docslstG2);
                for(var k in docslstG2){
                    this.Group2bIdType1 += docslstG2[parseInt(k)]+';';
                }                
                console.log('this.group2bIdType>>',this.Group2bIdType1);
            }
        }
        else if (this.urlName == 'Safeguarding') {
            if (event.target.name == 'safedate') {
                this.safegDate = event.target.value;
                console.log('this.safegDate ---->' + this.safegDate);
            }
        }

        else if (this.urlName == 'Emergency Contact') {
            if (event.target.name == 'EconName') {
                this.eContactName = event.target.value;
                console.log('this.eContac ---> ' + this.eContactName);
            } else if (event.target.name == 'EconMobile') {
                this.eConMobile = event.target.value;
                console.log('this.eConMobile ---> ' + this.eConMobile);
            } else if (event.target.name == 'EconWork') {
                this.eConWork = event.target.value;
                console.log('this.eConWork ->' + this.eConWork);
            } else if (event.target.name == 'Relation') {
                this.Relate = event.target.value;
                console.log('this.Relate --->' + this.Relate);
            } else if (event.target.name == 'EconHome') {
                this.eConHome = event.target.value;
                console.log('this.eConHome --->' + this.eConHome);

            } else if (event.target.name == 'EconAdd') {
                this.eConAdd = event.target.value;
                console.log('this.eConAdd --->' + this.eConAdd);

            }
        }

        else if (this.urlName == 'DBS') {
            if (event.target.name == 'dbnumber') {
                this.dbNum = event.target.value;
                console.log('this.dbNum --->' + this.dbNum);
            } else if (event.target.name == 'dbsname') {
                this.dbsUpdateSer = event.target.value;
                console.log('this.dbsUpdateSer -------->' + this.dbsUpdateSer);
            }

        }

        else if (this.urlName == 'Post 16 Qualifications') {
            if (event.target.name == 'snumber') {
                this.snumb = event.target.value;
                console.log('this.snumb --->' + this.snumb);
            } else if (event.target.name == 'quList') {
                this.qValue = event.detail.value;
                console.log('this.qValue --->' + this.qValue);
            } else if (event.target.name == 'expDate') {
                this.expirDate = event.target.value;
                console.log('this.expirDate -------->' + this.expirDate);
            } else if (event.target.name == 'qtl') {
                this.QtlsCheck = event.target.checked;
                console.log('this.QtlsCheck --->' + this.QtlsCheck);
            } else if (event.target.name == 'qualselect') {
                // this.qualmultipick = event.detail.value;
                const docspost16 =  Object.assign({}, event.detail.value);
                console.log('docspost16>>',docspost16);
                for(var k in docspost16){
                    this.qualmultipick += docspost16[parseInt(k)]+';';
                }    
                console.log('this.qualmultipick --->' + this.qualmultipick);
            }

        }

        else if (this.urlName == 'International') {
            if (event.target.name == 'seekIntPos') {                
                this.seekIntPos = event.target.checked;
                console.log('this.seekIntPos>>>',this.seekIntPos);
            } else if (event.target.name == 'country') {
                // var docslst1 = []; 
                var docslst1 = Object.assign({}, event.detail.value);
                console.log('docslst1>>',docslst1);
                for(var k in docslst1){
                    this.country += docslst1[parseInt(k)]+';';
                }    
                console.log('this.country>>',this.country);
            }
        }

        else if (this.urlName == 'Early Year Qualification') {
            if (event.target.name == 'earlyYearQFtype') {                
                this.earlyYearQFtype = event.target.value;
            } else if (event.target.name == 'earlyYearQualifications') {
                const docslst = Object.assign({}, event.detail.value);
                console.log('docslst>>',docslst);
                for(var k in docslst){
                    this.earlyYearQualifications += docslst[parseInt(k)]+';';
                }    
            }
        }

        else if (this.urlName == 'Support Qualifications') {
            if (event.target.name == 'supportQFtype') {                
                this.earlyYearQFtype = event.target.value;
            } else if (event.target.name == 'supportQualifications') {
                const docslst = Object.assign({}, event.detail.value);
                console.log('docslst>>',docslst);
                for(var k in docslst){
                    this.supportQualifications += docslst[parseInt(k)]+';';
                }    
            }
        }

        else if(this.urlName == 'Barred List'){

            if(event.target.name == 'barredcheckurl'){
                this.barredcheckurl = event.target.value;;
            }   
            else if(event.target.name == 'barredListResult'){
                this.barredListResult = event.target.value;
            }
            else if(event.target.name == 'ewscheckeddate'){
                this.ewscheckeddate = event.target.value;
            }
            else if(event.target.name == 'ewsnextcheckeddate'){
                this.ewsnextcheckeddate = event.target.value;
            }
            else if(event.target.name == 'barredlistdatecheck'){
                this.barredlistdatecheck = event.target.value;
            }
            else if(event.target.name == 'barredlistexpirydate'){
                this.barredlistexpirydate = event.target.value;
            }
            else if(event.target.name == 'DOB'){
                this.DOB = event.target.value;
            }

        }

        else if(this.urlName == 'References'){

            if(event.target.name == 'Ref1sentdate'){
                this.Ref1sentdate = event.target.value;
            }   
            else if(event.target.name == 'Reference1name'){
                this.Reference1name = event.target.value;
            }
            else if(event.target.name == 'Reference1recdate'){
                this.Reference1recdate = event.target.value;
            }
            else if(event.target.name == 'Reference1phone'){
                this.Reference1phone = event.target.value;
            }
            else if(event.target.name == 'Reference1daterangestart'){
                this.Reference1daterangestart = event.target.value;    
            }
            else if(event.target.name == 'Reference1email'){
                this.Reference1email = event.target.value;
            }
            else if(event.target.name == 'Reference1daterangeend'){
                this.Reference1daterangeend = event.target.value;
            }
            else if(event.target.name == 'Ref1Type'){
                this.Ref1Type = event.target.value;
            }
            else if(event.target.name == 'Ref1Rec'){
                this.Ref1Rec = event.target.value;
            }
            else if(event.target.name == 'Ref1Rating'){
                this.Ref1Rating = event.target.value;
            }
            else if(event.target.name == 'Ref2sentdate'){
                this.Ref2sentdate = event.target.value;
            }
            else if(event.target.name == 'Reference2name'){
                this.Reference2name = event.target.value;
            }
            else if(event.target.name == 'Ref1recdate'){
                this.Ref1recdate = event.target.value;
            }
            else if(event.target.name == 'Ref2phone'){
                this.Ref2phone = event.target.value;
            }
            else if(event.target.name == 'Ref2daterangest'){
                this.Ref2daterangest = event.target.value;
            }
            else if(event.target.name == 'Ref2email'){
                this.Ref2email = event.target.value;
            }
            else if(event.target.name == 'Ref2daterangeend'){
                this.Ref2daterangeend = event.target.value;
            }
            else if(event.target.name == 'Ref2Type'){
                this.Ref2Type = event.target.value;   
            }
            else if(event.target.name == 'Ref2rec'){
                this.Ref2rec = event.target.value;   
            }
            else if(event.target.name == 'Ref2Rating'){
                this.Ref2Rating = event.target.value;
            }
            else if(event.target.name == 'Ref3sentdate'){
                this.Ref3sentdate = event.target.value;
            }
            else if(event.target.name == 'Reference3Name'){
                this.Reference3Name = event.target.value;
            }
            else if(event.target.name == 'Ref3revdate'){
                this.Ref3revdate = event.target.value; 
            }
            else if(event.target.name == 'Reference3phone'){
                this.Reference3phone = event.target.value;
            }
            else if(event.target.name == 'Ref3daterangest'){
                this.Ref3daterangest = event.target.value;
            }
            else if(event.target.name == 'Ref3email'){
                this.Ref3email = event.target.value;
            }
            else if(event.target.name == 'Ref3dtrangeend'){
                this.Ref3dtrangeend = event.target.value;
            }
            else if(event.target.name == 'Ref3type'){
                this.Ref3type = event.target.value;   
            }
            else if(event.target.name == 'Ref3received'){
                this.Ref3received = event.target.value;
            }
            else if(event.target.name == 'Ref3rating'){
                this.Ref3rating = event.target.value;
            }
            
        }
        
    }

    saveQualification(){
        this.isSpinner = true;
        console.log('In saveQualification');
        let qualObj = { 'sobjectType': 'TR1__Associated_Qualification__c' };
        qualObj.qualificationName__c = this.urlName;
        if(this.urlName == 'CV'){
            qualObj.Gaps_Explanation__c = this.gapsExplanation;
            qualObj.CV_Submitted__c = this.cvSubmitted;
            qualObj.CV_Received__c = this.cvReceived;
        }    
        else if(this.urlName == 'Perm Qualification'){
            qualObj.NCTL_Number__c = this.nctlNum;
            qualObj.SET_Registration_Number__c = this.setNum;
            qualObj.QTLS__c = this.qtls;
        }
        
        else if(this.urlName == 'Right to Work'){
            
            console.log('this.workPermit>>',this.workPermit);
            console.log('this.s>>',this.s);
           
            qualObj.Permanent_Right_to_Work_in_UK__c = this.workPermit;
            qualObj.Documents__c = this.s;
            qualObj.Work_Permit_OR_Visa_Expiry_Date__c = this.workpermitdate;
        }

        else if(this.urlName == 'Teacher Qualification'){
            
            qualObj.NCTL_Number__c = this.tranum;
            qualObj.Qualification_Type2__c = this.teacherQftype;
            qualObj.Qualification_Type__c = this.teacherDualVal;
        }

        else if(this.urlName == 'Overseas Teacher Qualifications'){
            qualObj.NCTL_Number__c = this.otstranum;
            qualObj.NARIC_Approved__c = this.naricApprove;
            qualObj.Qualification_Type2__c  = this.OTQQFtypeval;
            qualObj.Qualification_Type__c = this.OTQteacherQualification;
        }

        else if(this.urlName == 'Overseas Police Check'){
        
            qualObj.Overseas_Police_Check__c = this.overseasPoliceOps;
            qualObj.Live_Worked_Overseas_Start_Date__c = this.opcStdate;
            qualObj.Live_Worked_Overseas_End_Date__c = this.opcEddate;
        }

        else if(this.urlName == 'ID'){
            
            console.log('In ID>>');
            qualObj.Group_1_ID_Type__c = this.group1IdTypeVal;
            qualObj.Name_Change_Document__c = this.namechangedocument;
            qualObj.Group_2a_ID_Type__c = this.Group2aIdType1;
            qualObj.Group_2b_ID_Type__c = this.Group2bIdType1;
            console.log('this.Group2aIdType>>>',this.Group2aIdType1);
            console.log('this.Group2bIdType>>>',this.Group2bIdType1);
        }

        else if (this.urlName == 'Safeguarding') {
            qualObj.Safeguarding_Date_Completed__c = this.safegDate;
            console.log('qualObj.Safeguarding_Date_Completed__c ----> ' + qualObj.Safeguarding_Date_Completed__c);
        }
        
        else if (this.urlName == 'Emergency Contact') {
            qualObj.Relationship_to_You__c = this.Relate;
            qualObj.Emergency_Contact_Address__c = this.eConAdd;
            qualObj.Emergency_Contact_Home_Phone__c = this.eConHome;
            qualObj.Emergency_Contact_Mobile_Phone__c = this.eConMobile;
            qualObj.Emergency_Contact_Work_Phone__c = this.eConWork;
            qualObj.Emergency_Contact_Name__c = this.eContactName;
            console.log('qualObj.Emergency_Contact_Name__c ----> ' + qualObj.Emergency_Contact_Name__c);
        }
        
        else if (this.urlName == 'DBS') {
            qualObj.DBS_Form_Number__c = this.dbNum;
            qualObj.Update_Service_Status_Check__c = this.dbsUpdateSer;

        }

        else if (this.urlName == 'Post 16 Qualifications') {
            qualObj.SET_Registration_Number__c = this.snumb;
            qualObj.Qualification_Type2__c = this.qValue;
            qualObj.SET_Expiry_Date__c = this.expirDate;
            qualObj.QTLS__c = this.QtlsCheck;
            qualObj.Qualification_Type__c = this.qualmultipick;
        }

        else if(this.urlName == 'International'){

            qualObj.Seeking_International_Position__c = this.seekIntPos;
            qualObj.Choice_of_Country__c = this.country;
        }

        else if (this.urlName == 'Early Year Qualification') {
            
            qualObj.Qualification_Type2__c = this.earlyYearQFtype;
            qualObj.Qualification_Type__c = this.earlyYearQualifications;
        }

        else if (this.urlName == 'Support Qualifications') {
            
            qualObj.Qualification_Type2__c = this.supportQFtype;
            qualObj.Qualification_Type__c = this.supportQualifications;
        }

        else if(this.urlName == 'Barred List'){
            qualObj.Barred_Check_URL__c = this.barredcheckurl;
            qualObj.Barred_List_Results__c = this.barredListResult;
            qualObj.EWC_Registration_Checked_Date__c = this.ewscheckeddate;
            qualObj.EWC__c = this.ewsnextcheckeddate;
            qualObj.Barred_List_Date_Checked__c = this.barredlistdatecheck;
            qualObj.Barred_List_Expiry_Date_New__c = this.barredlistexpirydate;
            // qualObj. = this.DOB
        }

        else if(this.urlName == 'References'){
            qualObj.Reference_Sent_Date__c = this.Ref1sentdate;
            qualObj.Reference_1_Text_Name__c = this.Reference1name;
            qualObj.Reference_Received_Date__c = this.Reference1RecDate;
            qualObj.Reference_1_Contact_Details__c = this.Reference1phone;
            qualObj.Reference_1_Email__c = this.Reference1email;
            qualObj.Reference_1_Date_Range_End__c = this.Reference1daterangeend;
            qualObj.Reference_1_Type__c = this.Ref1Type;
            qualObj.Reference_1_Received__c = this.Ref1Rec;
            qualObj.Reference_1_Rating__c = this.Ref1Rating;
            qualObj.Reference_Sent_Date__c = this.Ref2sentdate;
            qualObj.Reference_2_Name__c = this.Reference2name;
            qualObj.Reference_2_Received_Date__c = this.Ref1recdate;
            qualObj.Reference_2_Contact_Details__c = this.Ref2phone;
            qualObj.Reference_2_Date_Rage__c = this.Ref2daterangest;
            qualObj.Reference_2_Email__c = this.Ref2email;
            qualObj.Reference_2_Date_Range_End__c = this.Ref2daterangeend;
            qualObj.Reference_2_Type__c = this.Ref2Type;
            qualObj.Reference_2_Received__c = this.Ref2rec;
            qualObj.Reference_2_Rating__c = this.Ref2Rating;
            qualObj.Reference_3_Sent_Date__c = this.Ref3sentdate;
            qualObj.Reference_3_Text_Name__c = this.Reference3Name;
            qualObj.Reference_3_Received_Date__c = this.Ref3revdate;
            qualObj.Reference_3_Contact_Details__c = this.Reference3phone;
            qualObj.Reference_3_Date_Range__c = this.Ref3daterangest;
            qualObj.Reference_3_Email__c = this.Ref3email;
            qualObj.Reference_3_Date_Range_End__c = this.Ref3dtrangeend;
            qualObj.Reference_3_Type__c = this.Ref3type;
            qualObj.Reference_3_Received__c = this.Ref3received;
            qualObj.Reference_3_Rating__c = this.Ref3rating;

        }

        

        editQuali({
            conId : '0030C00000SPlMiQAL',
            qfname : this.urlName,
            qual : qualObj
        })
        .then(result => {
            this.isSpinner = false;
            console.log({result});
            this.isResult = true;
            // alert('Save Successfully');
        })

    }

    get options() {
        return [
            { label: 'Early Year Qualification', value: 'Early Year Qualification' },
            { label: 'Testing', value: 'Testing' }
        ];
    }

    renderedCallback() {
        Promise.all([
                loadStyle(this, Qualificationcss)
            ]).then(() => {
                console.log('Files loaded');
            })
            .catch(error => {
                console.log(error.body.message);
            });

        Promise.all([
                loadStyle(this, commstyle)
            ]).then(() => {
                console.log('Files loaded');
            })
            .catch(error => {
                console.log(error.body.message);
                this.reloadpage = true;
                this.template.querySelectorAll('c-ts_-error-component')[0].openModal();
            });
    }


    previewHandler(event){
        console.log('in preview handler');
        console.log(event.target.dataset.id)
        this[NavigationMixin.Navigate]({ 
            type:'standard__namedPage',
            attributes:{ 
                pageName:'filePreview'
            },
            state:{ 
                selectedRecordId: event.target.dataset.id
            }
        })
    }
}