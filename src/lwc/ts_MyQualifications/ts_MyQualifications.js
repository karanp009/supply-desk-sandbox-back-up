import { LightningElement,track,wire } from 'lwc';
import caseIcon from '@salesforce/resourceUrl/caseIcon';
import editIcon from '@salesforce/resourceUrl/editIcon';
import getQualification from '@salesforce/apex/ts_MyQualificationsController.getQualification';
import { NavigationMixin } from 'lightning/navigation';

 
export default class Ts_MyQualifications extends NavigationMixin(LightningElement) {

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
            .catch(error => {
                console.log({error});
            });
    }

    editQualification(event){
        let m = event.currentTarget.dataset.id;
        console.log({m});
        
        // var compDefinition = {
        //     componentDef: "c:ts_MyQualificationDetail",
        //     attributes: {
        //         propertyValue: "500"
        //     },
        //     state: {
        //         propertyValue: 'test'
        //     }
        // };
        // console.log({compDefinition});
        // Base64 encode the compDefinition JS object
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name:'QualificationDetail__c',
                url: '/s/qualificationdetail'
            },
            state: {
                qualification: m
            }
        },true
        );
    }
}