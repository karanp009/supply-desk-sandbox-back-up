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
import { CurrentPageReference } from 'lightning/navigation';
import Qualificationcss from '@salesforce/resourceUrl/Qualificationcss';
import getContactId from '@salesforce/apex/ts_MyQualificationDetailController.getContactId';
import editQuali from '@salesforce/apex/ts_MyQualificationDetailController.editQuali';

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
    @track naricApproveOps;

    //For teacher qualification
    @track teacherQFTypeOptions;
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
    @track groupTypes;
    @track nameChangeDocuments;
    @track Group2aIdTypes = [];
    @track Group2bIdTypes = [];

    @track group1IdTypeVal;
    @track namechangedocument;
    @track group2aIdType = '';
    @track group2bIdType = '';

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
    workRightValues(data,error){
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

            if(event.target.name == ''){

            }
            if(event.target.name == ''){
                
            }
            if(event.target.name == ''){
                
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