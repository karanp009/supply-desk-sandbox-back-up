import { LightningElement, track, wire, api } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import earlyQualification from '@salesforce/resourceUrl/earlyQualification';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import Qualification_Type2__c from '@salesforce/schema/TR1__Associated_Qualification__c.Qualification_Type2__c';
import TR1__Associated_Qualification__c from '@salesforce/schema/TR1__Associated_Qualification__c';
import getContactId from '@salesforce/apex/ts_earlyyearqualification.getContactId';
import editQuali from '@salesforce/apex/ts_earlyyearqualification.editQuali';

const fields = [Qualification_Type2__c];

export default class Ts_earlyyearqualification extends LightningElement {

    // @track urlName = 'Perm DBS';
    @track urlName = 'Safeguarding';
    @track contactId;
    @api dbsValue;

    @track permtext;
    @track safegDate;
    checked = false;



    connectedCallback() {
        console.log('In the connected callback');
        this.getconID();
        // this.editQ();
    }

    getconID() {
        getContactId({})
            .then((result) => {
                this.contactId = result;
                console.log({ result });
            })
    }


    handleChange(event) {
        console.log({ event });
        if (this.urlName == 'Perm DBS') {
            if (event.target.name == 'permDBS') {
                this.permtext = event.target.value;
                console.log('this.permtext ---->' + this.permtext);
            }
            // else if (event.target.name == 'onUPser') {
            //     this.cvSubmitted = event.target.checked;
            //     console.log('this.cvSubmitted>>', this.cvSubmitted);
            // }
        }
        if (this.urlName == 'Safeguarding') {
            if (event.target.name == 'safedate') {
                this.safegDate = event.target.value;
                console.log('this.safegDate ---->' + this.safegDate);
            }
        }
    }

    saveQualification() {
        console.log('In saveQualification');
        let qualObj = { 'sobjectType': 'TR1__Associated_Qualification__c' };
        qualObj.qualificationName__c = this.urlName;
        console.log({ qualObj });
        if (this.urlName == 'Perm DBS') {
            qualObj.Gaps_Explanation__c = this.gapsExplanation;
            qualObj.CV_Submitted__c = this.cvSubmitted;
        }
        else if (this.urlName == 'Safeguarding') {
            qualObj.Safeguarding_Date_Completed__c = this.safegDate;
            console.log('qualObj.Safeguarding_Date_Completed__c ----> ' + qualObj.Safeguarding_Date_Completed__c);
        }
        console.log('this.contactId>>',this.contactId);
        console.log('this.urlName>>',this.urlName);
        editQuali({
            conId: this.contactId,
            qfname: this.urlName,
            qual: qualObj
        })
            .then(result => {
                console.log({ result });
                alert('Save Successfully');
            })
    }


    // // @track EYvalue;
    // // @track lstOptions;
    // @track contactId;
    // @track earlyQual;

    // getConId() {

    //     getContactId()
    //         .then(result => {
    //             console.log({ result });
    //             this.contactId = result;
    //         })

    // }
    // @track urlName = 'Early Qualification';


    // editQ() {

    //     console.log('in the edit one');
    //     editQuali({

    //         conId: this.contactId,
    //         qfname: this.urlName,
    //         qual: qualObj
    //     }
    //     )
    //         .then((editQuali) => {
    //             console.log(editQuali);
    //         })
    // }


    // // Step 1
    // @wire(getRecord, { recordId: '$qualObjectInfo.data.defaultRecordTypeId', fields })
    // languages({ error, data }) {
    //     if (data) {
    //         console.log({ data });
    //         let typeValue = getFieldValue(data, Qualification_Type2__c);
    //         this.selectedOption = typeValue;
    //         // this._recordTypeId = '012000000000000AAA'; // setting this value will re-invoke the wire
    //     } else if (error) {
    //         console.log(error);
    //     }
    // }

    // // Step 2, determined by when the reactive bind is changed
    // @wire(getPicklistValues, { recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId', fieldApiName: Qualification_Type2__c })
    // setPicklistOptions({ error, data }) {
    //     if (data) {
    //         console.log({ data });
    //         // Apparently combobox doesn't like it if you dont supply any options at all.
    //         // Even though selectedOption was assigned in step 1, it wont "select" it unless it also has options
    //         this.options = data.values;
    //     } else if (error) {
    //         console.log(error);
    //     }
    // }

    // handleChange() {

    // }

    // saveQualification() {
    //     console.log('For save come here');
    //     let qualObj = { 'sobjectType': 'TR1__Associated_Qualification__c' };
    //     qualObj.qualificationName__c = this.urlName;

    //     if (this.urlName == 'Early Years Qualifications') {
    //         this.earlyQual = event.target.value;
    //         console.log('this.gapsExplanation>>', this.earlyQual);
    //     } else if (this.urlName == 'Support Qualifications') {
    //         this.earlyQual = event.target.value;
    //         console.log('this.gapsExplanation>>', this.earlyQual);
    //     }
    //     editQuali({
    //         conId: this.contactId,
    //         qfname: this.urlName,
    //         qual: qualObj
    //     })
    //         .then(result => {
    //             console.log({ result });
    //             alert('Save Successfully');
    //         })

    // }

    // // // Get Object Info.
    // // @wire(getObjectInfo, { objectApiName: TR1__Associated_Qualification__c })
    // // qualObjectInfo;

    // // // Get Picklist values.
    // // @wire(getPicklistValues, { recordTypeId: '$qualObjectInfo.data.defaultRecordTypeId', fieldApiName: Qualification_Type2__c })
    // // languages(data, error) {
    // //     if (data && data.data && data.data.values) {
    // //         // data.data.values.forEach( objPicklist => {
    // //         //     this.lstOptions.push({
    // //         //         label: objPicklist.label,
    // //         //         value: objPicklist.value
    // //         //     });
    // //         //     console.log('this.lstOptions>>',this.lstOptions);
    // //         // });
    // //         let options = [];

    // //         for (var key in data) {

    // //             options.push({ label: data[key].Name, value: data[key].Id });
    // //         }
    // //         this.lstOptions = options;
    // //     } else if (error) {
    // //         console.log(error);
    // //     }
    // // };

    // get options() {
    //     return [
    //         { label: 'Early Year Qualification', value: 'Early Year Qualification' },
    //         { label: 'Testing', value: 'Testing' }
    //     ];
    // }

    // renderedCallback() {

    //     this.getConId();
    //     this.editQ();

    //     console.log('before promise');
    //     Promise.all([
    //         loadStyle(this, earlyQualification),
    //         // loadScript(this, leaflet + '/leaflet.js'),
    //     ]).then(() => {
    //         console.log('Files loaded');
    //     })
    //     console.log('after promise');
    // }
}