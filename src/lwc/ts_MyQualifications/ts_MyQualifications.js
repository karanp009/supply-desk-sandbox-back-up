import { LightningElement, track, wire } from 'lwc';
import communityicon from '@salesforce/resourceUrl/communityicons';
import getQualification from '@salesforce/apex/ts_MyQualificationsController.getQualification';
import { NavigationMixin } from 'lightning/navigation';


export default class Ts_MyQualifications extends NavigationMixin(LightningElement) {

    editImg = communityicon + '/communityicons/edit.png';
    @track qualificationList;

    @track showEdit;

    connectedCallback() {

        this.getQualify();
    }

    getQualify() {

        getQualification()
            .then(result => {

                for (var i = 0; i < result.length; i++) {
                    if (result[i].TR1__Status__c == 'Requested') {

                        result[i]["Status"] = true;
                    } else {

                        result[i]["Status"] = false;
                    }
                }
                console.log({ result });
                this.qualificationList = result;
            })
            .catch(error => {
                console.log({ error });
            });
    }

    editQualification(event) {
        let m = event.currentTarget.dataset.id;
        console.log({ m });

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'QualificationDetail__c',
                url: '/s/qualificationdetail'
            },
            state: {
                qualification: m
            }
        }, true);
    }
}