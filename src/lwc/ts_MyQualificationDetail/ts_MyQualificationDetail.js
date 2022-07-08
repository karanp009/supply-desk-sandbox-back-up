import { LightningElement,api, track, wire} from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import TR1__Associated_Qualification__c from '@salesforce/schema/TR1__Associated_Qualification__c'; 
import Permanent_Right_to_Work_in_UK__c from '@salesforce/schema/TR1__Associated_Qualification__c.Permanent_Right_to_Work_in_UK__c';
import Documents__c from '@salesforce/schema/TR1__Associated_Qualification__c.Documents__c';
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
        console.log({data});
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
        // else if(this.urlName == 'Right to Work'){
            console.log('Right To Work');
            if(event.target.name == 'workPermit'){
                this.workPermit = event.detail.value;
                console.log('this.workPermit>>>',this.workPermit);
            }
            else if(event.target.name == 'docs'){
                
                this.docs = event.detail.value;
                const docslst = Object.assign({}, this.docs);
                console.log('docslst>>',docslst);
                // console.log('len>>',docslst.length);
                // for(var i=0;i<docslst.length;i++){
                    
                // }
                for(var k in docslst){
                    console.log({k});
                    var i  = parseInt(k);
                    console.log({i});
                    this.docslst2.push(docslst[i]+';');
                    this.s += docslst[i]+';';
                }
                console.log('this.docslst2>>',this.docslst2);
                console.log('s>>',this.s);
                
            }
        // }
        else if(this.urlName == 'Teacher Qualification'){
            
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
        
        else if(this.urlName == 'Teacher Qualification'){
            
        }
        else{
            console.log('in else');
            console.log('this.workPermit>>',this.workPermit);
            console.log('this.docslst2>>',this.docslst2);
           
            qualObj.Permanent_Right_to_Work_in_UK__c = this.workPermit;
            qualObj.Documents__c = this.s;
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