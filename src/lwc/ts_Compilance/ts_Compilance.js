import { LightningElement, wire, track } from 'lwc';
import coverImgClient from '@salesforce/resourceUrl/coverImgClient';
import { NavigationMixin } from 'lightning/navigation';
import USER_ID from '@salesforce/user/Id';
import getcrdata from '@salesforce/apex/ts_RegisterController.getcrdata';

export default class Ts_Compilance extends NavigationMixin(LightningElement) {

    crId;
    cvrImg = coverImgClient;
    crlist;
    usrId = USER_ID;

    connectedCallback(){
        console.log('connected callback');
        // this.getcrvalue();
        console.log('this-->',this.usrId);
    }

    renderedCallback() {
        this.getcrvalue();
    }

    getcrvalue(){
        getcrdata({ userid:  this.usrId})
            .then((result) => {
                console.log({result});
                this.crlist = result;
            })
            .catch(error => {
                console.log(error);
            })   
    }

    openpdf(event){
        console.log('open PDF');
        console.log({event});
        console.log(event.target.dataset.value);
        var crval = event.target.dataset.value;
        console.log({crval});

        if(crval != null || crval != '' || crval != undefined){
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: 'CompliancePDF__c',
                    url: '/s/compliance/compliancepdf'
                },
                state: {
                    id: 'a090C000002TpMNQA0' // Value must be a string
                }
            });
        }
    }

}