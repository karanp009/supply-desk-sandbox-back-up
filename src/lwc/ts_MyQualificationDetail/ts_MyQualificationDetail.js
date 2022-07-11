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
import { CurrentPageReference } from 'lightning/navigation';
import Qualificationcss from '@salesforce/resourceUrl/Qualificationcss';
import getContactId from '@salesforce/apex/ts_MyQualificationDetailController.getContactId';
import editQuali from '@salesforce/apex/ts_MyQualificationDetailController.editQuali';
import Choice_of_Country__c from '@salesforce/schema/TR1__Associated_Qualification__c.Choice_of_Country__c';


export default class Ts_MyQualificationDetail extends LightningElement {

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

    //For Perm Qualification
    @track nctlNum;
    @track setNum;
    @track qtls;

    //For Right to work
    @track workPermit;
    docs = [];

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

    //For Id Qualification
    @track groupTypes = [];
    @track nameChangeDocuments = [];
    @track Group2aIdTypes = [];
    @track Group2bIdTypes = [];

    @track group1IdTypeVal;
    @track namechangedocument;
    @track group2aIdType = '';
    @track group2bIdType = '';

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
    @track qualmultipick;
    @track qualopt = [];

    //For international

    @track choiceOfCountryOps = [];

    @track country='';
    @track seekIntPos;



    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
       if (currentPageReference) {
          this.urlStateParameters = currentPageReference.state;
          this.setParametersBasedOnUrl();
       }
    }

    setParametersBasedOnUrl() {
       this.urlName = this.urlStateParameters.qualification || null;
       console.log('this.urlName>>',this.urlName);
    }

    // Get Object Info.
    @wire (getObjectInfo, {objectApiName: TR1__Associated_Qualification__c})
    qualObjectInfo;

    // Get Picklist values.
   

    @wire(getPicklistValues, {recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId', fieldApiName: Documents__c})
    languages(data, error){
        if(data && data.data && data.data.values){
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
    workRightValues(data,error){
        
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
            data.data.values.forEach( objPicklist => {
                
                this.teacherQualifications.push({
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
    groupTypeOptions(data,error){
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

    connectedCallback(){
        console.log('qualificationname>>>'+this.qualification); 
        this.getConId();
    }

    currentPageReference = null; 
    urlStateParameters = null;

    @track urlName = null;

    


    getConId(){

        getContactId()
            .then(result => {
                console.log({result});
                this.contactId = result;
            })
        
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
                this.workPermit = event.detail.value;
                console.log('this.workPermit>>>',this.workPermit);
            }
            else if(event.target.name == 'docs'){
                
                this.docs = event.detail.value;
                const docslst = Object.assign({}, this.docs);
                console.log('docslst>>',docslst);
                for(var k in docslst){
                    this.s += docslst[parseInt(k)]+';';
                }                
                console.log('s>>',this.s);                
            }
            else if(event.target.name == 'rtwdocs'){
                this.rtwdocs = event.target.value;
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

                const docslst = Object.assign({}, event.detail.value);
                console.log('docslst>>',docslst);
                for(var k in docslst){
                    this.teacherDualVal += docslst[parseInt(k)]+';';
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
            }
            else if(event.target.name == 'namechangedocument'){
                this.namechangedocument = event.target.value;
            }
            else if(event.target.name == 'group2aIdType'){

                const docslst = Object.assign({}, event.detail.value);
                console.log('docslst>>',docslst);
                for(var k in docslst){
                    this.group2aIdType += docslst[parseInt(k)]+';';
                }                
                
            }
            else if(event.target.name == 'group2bIdType'){
                
                const docslst = Object.assign({}, event.detail.value);
                console.log('docslst>>',docslst);
                for(var k in docslst){
                    this.group2bIdType += docslst[parseInt(k)]+';';
                }                
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
                this.dbsUpdateSer = event.detail.value;
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
                this.qualmultipick = event.detail.value;
                console.log('this.qualmultipick --->' + this.qualmultipick);
            }

        }

        else if (this.urlName == 'International') {
            if (event.target.name == 'seekIntPos') {                
                this.seekIntPos = event.target.checked;
            } else if (event.target.name == 'country') {

                const docslst = Object.assign({}, event.detail.value);
                console.log('docslst>>',docslst);
                for(var k in docslst){
                    this.country += docslst[parseInt(k)]+';';
                }    
            }
        }
        
    }

    saveQualification(){

        console.log('In saveQualification');
        let qualObj = { 'sobjectType': 'TR1__Associated_Qualification__c' };
        qualObj.qualificationName__c = this.urlName;
        if(this.urlName == 'CV'){
            qualObj.Gaps_Explanation__c = this.gapsExplanation;
            qualObj.CV_Submitted__c = this.cvSubmitted;
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
        
            qualObj.Group_1_ID_Type__c = this.group1IdTypeVal;
            qualObj.Name_Change_Document__c = this.namechangedocument;
            qualObj.Group_2a_ID_Type__c = this.Group2aIdType;
            qualObj.Group_2b_ID_Type__c = this.Group2bIdType;
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
            qualObj.Update_Service_Status_Check__c = this.dbsOptions;

        }

        else if (this.urlName == 'Post 16 Qualifications') {
            qualObj.SET_Registration_Number__c = this.snumb;
            qualObj.Qualification_Type2__c = this.qList;
            qualObj.SET_Expiry_Date__c = this.expirDate;
            qualObj.QTLS__c = this.QtlsCheck;
            qualObj.Qualification_Type__c = this.qualmultipick;
        }

        else if(this.urlName == 'International'){

            qualObj.Seeking_International_Position__c = this.seekIntPos;
            qualObj.Choice_of_Country__c = this.country;
        }

        

        editQuali({
            conId : this.contactId,
            qfname : this.urlName,
            qual : qualObj
        })
        .then(result => {
            console.log({result});
            alert('Save Successfully');
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
    }
}