import { LightningElement, track, wire } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import commstyle from '@salesforce/resourceUrl/CommunityCSS';
import loginbg from '@salesforce/resourceUrl/loginbg';
import communityicon from '@salesforce/resourceUrl/communityicons';
import Contact from '@salesforce/schema/Contact'; 
import Roles__c from '@salesforce/schema/Contact.Roles__c';

export default class Ts_Register extends LightningElement {

    bglogo = communityicon + '/communityicons/supplydesk_logo.png';
    fname_icon = communityicon + '/communityicons/firstname.png';
    email_icon = communityicon + '/communityicons/email.png';
    mob_icon = communityicon + '/communityicons/mobileno.png';
    phone_icon = communityicon + '/communityicons/phoneno.png';
    postcode_icon = communityicon + '/communityicons/postcode.png';
    job_icon = communityicon + '/communityicons/jobtitle.png';
    
    @track jobpicklist = [];
    contwrap;
    emailerror;
    fnameerror;
    phoneerror;
    postcodeerror;
    mobileerror;

    // for loading spinner
    @track isSpinner = false;      
    // For Reload Page
    @track reloadpage;                  

    // Get Object Info.
    @wire (getObjectInfo, {objectApiName: Contact})
    conObjectInfo;

    @wire(getPicklistValues, {
        recordTypeId: '$conObjectInfo.data.defaultRecordTypeId',
        fieldApiName: Roles__c
    })
    wiredjobpicklist({ data,error }) {
        console.log({ data });
        if (data) {
            this.jobpicklist = [{ label: 'None', value: '', selected: true }, ...data.values];
        } else {
            console.log({ error });
            this.jobpicklist = undefined;
            this.error = error;
        }
    }

    connectedCallback() {
        this.setwraponload();
        this.isSpinner = true;
        var meta = document.createElement("meta");
        meta.setAttribute("name", "viewport");
        meta.setAttribute("content", "width=device-width, initial-scale=1.0");
        document.getElementsByTagName('head')[0].appendChild(meta);
        setTimeout(() => {
            this.isSpinner = false;
        }, 1000);
    }

    // Get Background Image
    get backgroundImage() {
        return `background-image:url(${loginbg})`;
    }

    renderedCallback() {

        Promise.all([
            loadStyle(this, commstyle)
        ]).then(() => {
            console.log('Files loaded');
        })
            .catch(error => {
                console.log(error.body.message);
            });
    }

    handleChange(event) {
        console.log({ event });
        var valname = event.target.name;
        console.log({ valname });
        if (valname == "FirstName") {
            this.contwrap.FirstName = event.target.value;
            console.log(event.target.value);
        } else if (valname == "LastName") {
            this.contwrap.LastName = event.target.value;
            console.log('OUTPUT lastname:',event.target.value);
        } else if (valname == "Email") {
            this.contwrap.Email = event.target.value;
            console.log(this.contwrap);
        } else if (valname == "Job Title") {
            this.contwrap.Job = event.target.value;
        } else if (valname == "Postcode") {
            this.contwrap.Postcode = event.target.value;
        } else if (valname == "Mobile") {
            this.contwrap.Mobile = event.target.value;
        } else if (valname == "Phone") {
            this.contwrap.Phone = event.target.value;
        } else {
            console.log('else');
        }
    }

    register() {
        var wrapdata = JSON.stringify(this.contwrap);
        var phoneno = /^\d{10}$/;
        console.log({ wrapdata });
        console.log(this.contwrap);

        if(this.contwrap["FirstName"].length == 0){
            this.fnameerror = "Complete this Field!!!";
        }
        else{
            this.fnameerror = "";
        }
    
        if(this.contwrap["LastName"].length == 0){
            this.fnameerror = "Complete this Field!!!";
        }
        else{
            this.fnameerror = "";
        }
    
        if(this.contwrap["Email"].length == 0){
            this.emailerror = "Complete this Field!!!";
        }
        else{
            var pattern =/^(([^<>()\[\]\\.,;#:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var emailpattern = pattern.test(this.contwrap["Email"]);
            if(!emailpattern){
                this.emailerror = "Enter Valid Email Address!!!";
            }
            else{
                this.emailerror = "";
            }
        }
    
        if(this.contwrap["Postcode"].length == 0){
            this.postcodeerror = "Complete this Field!!!";
        }
        else{
            this.postcodeerror = "";
        }
    
        if(this.contwrap["Phone"].length == 0){
            this.phoneerror = "Complete this Field!!!";
        }
        else if(!phoneno.test(this.contwrap["Phone"])){
            this.phoneerror = "Enter Valid Phone Number";
        }
        else{
            this.phoneerror = "";
        }
    
        if(this.contwrap["Mobile"].length == 0){
            this.mobileerror = "Complete this Field!!!";
        }
        else if(!phoneno.test(this.contwrap["Mobile"])){
            this.mobileerror = "Enter Valid Mobile Number";
        }
        else{
            this.mobileerror = "";
        }
        
        if(this.fnameerror.length == 0 && this.emailerror.length == 0 && this.phoneerror.length == 0 && this.mobileerror.length == 0){
            console.log('OUTPUT : Succesfulley register User ');
            CreateUser({ contwrapdata: wrapdata })
                .then((result) => {
                    console.log({ result });
                    if (result != null || result != '') {

                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.reloadpage = true;
                    this.template.querySelectorAll('c-ts_-error-component')[0].openModal();
                });
        }
        else{
            console.log('OUTPUT : User Not Registered ');
        }
    }

    setwraponload() {
        this.contwrap = {}
        this.contwrap.FirstName = '';
        this.contwrap.LastName = '';
        this.contwrap.Email = '';
        this.contwrap.Job = '';
        this.contwrap.Postcode = '';
        this.contwrap.Mobile = '';
        this.contwrap.Phone = '';
    } 
}