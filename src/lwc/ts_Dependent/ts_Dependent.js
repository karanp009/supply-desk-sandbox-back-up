import { LightningElement,wire,track } from 'lwc';
import {getObjectInfo} from 'lightning/uiObjectInfoApi';
import QUAL_OBJECT from '@salesforce/schema/TR1__Associated_Qualification__c';
import {getPicklistValues} from 'lightning/uiObjectInfoApi';
import SLA_FIELD from '@salesforce/schema/TR1__Associated_Qualification__c.Qualification_Type2__c';
import UPSELL_FIELD from '@salesforce/schema/TR1__Associated_Qualification__c.Qualification_Type__c';
 
export default class Ts_Dependent extends LightningElement {

    @wire(getObjectInfo, {objectApiName: QUAL_OBJECT })
    accountInfo;

    @track slaOptions;
    @track upsellOptions;

    @wire(getPicklistValues, {recordTypeId: '$accountInfo.data.defaultRecordTypeId', fieldApiName: UPSELL_FIELD })
    slaFieldInfo({ data, error }) {
        if (data) this.slaFieldData = data;
    }
    @wire(getPicklistValues, {recordTypeId:'$accountInfo.data.defaultRecordTypeId', fieldApiName: SLA_FIELD })
    upsellFieldInfo({ data, error }) {
        if (data) this.upsellOptions = data.values;
    }

    handleUpsellChange(event) {
        let key = this.slaFieldData.controllerValues[event.target.value];
        this.slaOptions = this.slaFieldData.values.filter(opt => opt.validFor.includes(key));
    }
}