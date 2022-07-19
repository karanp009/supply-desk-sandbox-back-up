import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import USER_ID from '@salesforce/user/Id';
import communityicon from '@salesforce/resourceUrl/communityicons';
import getcrdata from '@salesforce/apex/ts_RegisterController.getcrdata';
import downloadpdf from '@salesforce/apex/ts_RegisterController.downloadpdf';

export default class Ts_Compilance extends NavigationMixin(LightningElement) {

    crId;
    crlist;
    usrId = USER_ID;
    cvrImg = communityicon + '/communityicons/compliance_image.png';
    nodata = communityicon + '/communityicons/nodata.png';
    @track nodatafound = false;             // For No Record Found
    @track reloadpage;                      // For Reload Page
    @track isSpinner = false;

    // Get Background Image
    get backgroundImage() {
        return `background-image:url(${this.cvrImg})`;
    }

    get nodatafoundimg() {
        return `background-image:url(${this.nodata})`;
    }

    connectedCallback(){
        this.getcrvalue();
    }

    // Get Closing Report Value
    getcrvalue(){

        this.isSpinner = true;
        getcrdata({ userid:  this.usrId})
            .then((result) => {
                this.crlist = result;
                if(this.crlist.length == 0){
                    this.nodatafound = true;
                    this.isSpinner = false;
                }
                else {
                    this.nodatafound = false;
                    this.isSpinner = false;
                }
            })
            .catch(error => {
                this.reloadpage = true;
                this.template.querySelectorAll('c-ts_-error-component')[0].openModal();
                this.isSpinner = false;
            })
    }

    // Open PDF
    openpdf(event){

        try {

            var crval = event.target.dataset.value;
            const ua = navigator.userAgent;
            var device ;
            if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
                device = 'tablet';
            }
            else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
                device = 'mobile';
            }
            else{
                device = 'windows';
            }
            
            if(device != 'windows'){
                this.isSpinner = true;
                downloadpdf({recordid : crval})
                    .then((result) => {
                        var strFile = result;
                        const reader = new FileReader();

                        const link = document.createElement('a');
                        link.href = 'data:application/octet-stream;base64,'+strFile;
                        link.download = 'fileName.pdf';
                        link.click();
                        this.isSpinner = false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.reloadpage = true;
                        this.template.querySelectorAll('c-ts_-error-component')[0].openModal();
                        this.isSpinner = false;
                    })
            }
            else{
                if(crval != null || crval != '' || crval != undefined){
                    this[NavigationMixin.Navigate]({
                        type: 'comm__namedPage',
                        attributes: {
                            name: 'CompliancePDF__c',
                            url: '/s/compliance/compliancepdf',
                        },
                        state: {
                            recordId: crval
                        }
                    });
                }
            }
            
        } catch (error) {
            console.log({error});
            this.reloadpage = true;
            this.template.querySelectorAll('c-ts_-error-component')[0].openModal();
        }
    }
}