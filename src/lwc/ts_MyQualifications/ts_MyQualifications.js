import { LightningElement,track } from 'lwc';
import caseIcon from '@salesforce/resourceUrl/caseIcon';
import editIcon from '@salesforce/resourceUrl/editIcon';
import getQualification from '@salesforce/apex/ts_MyQualificationsController.getQualification';
 
export default class Ts_MyQualifications extends LightningElement {

    caseImg = caseIcon;
    editImg = editIcon;
    @track qualificationList;

    connectedCallback(){

        this.getQualify();
    }

    getQualify(){

        getQualification()
            .then(result => {
                console.log({result});
                this.qualificationList = result;
            })
    }
}