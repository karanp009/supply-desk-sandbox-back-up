import { LightningElement, wire, track } from 'lwc';
// import uname_img from '@salesforce/resourceUrl/usernameimg';
import passw_img from '@salesforce/resourceUrl/passwordimg';
import { loadStyle } from 'lightning/platformResourceLoader';
import commstyle from '@salesforce/resourceUrl/CommunityCSS';
import doLogin from '@salesforce/apex/tS_SignInController.doLogin';
// import loginbg from '@salesforce/resourceUrl/loginpageicons';
import loginbg from '@salesforce/resourceUrl/loginbg';
import communityicon from '@salesforce/resourceUrl/communityicons';

export default class Ts_SignIn extends LightningElement {

    passwordimg = communityicon + '/communityicons/password.png';
    bglogo = communityicon + '/communityicons/supplydesk_logo.png';
    userimg = communityicon + '/communityicons/username.png';
    @track isSpinner = false;                        // for loading spinner 
    username;
    password;
    loginerror;


    // For Reload Page
    @track reloadpage;

    connectedCallback() {
        this.isSpinner = true;
        var meta = document.createElement("meta");
        meta.setAttribute("name", "viewport");
        meta.setAttribute("content", "width=device-width, initial-scale=1.0");
        document.getElementsByTagName('head')[0].appendChild(meta);
        setTimeout(() => {
            this.isSpinner = false;
        }, 2000);
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
                this.reloadpage = true;
                this.template.querySelectorAll('c-ts_-error-component')[0].openModal();
            });
    }

    login() {

        var inp = this.template.querySelectorAll("lightning-input");

        inp.forEach(function(element){
            if(element.name == "username"){
                this.username = element.value;
            }
            else if(element.name == "password"){
                this.password = element.value;
            }
        },this);

        console.log(this.username);
        console.log(this.password);

        if(this.username == "" || this.username.length == 0){
            console.log("username is null");
            this.loginerror = "Complete this Field";
        }
        else if(this.password == "" || this.password.length == 0){
            this.loginerror = "Complete this Field";
        }
        else if(this.username.length > 0){
            this.loginerror = "";
            doLogin({
                username: this.username,
                password: this.password
            })
                .then((result) => {
                    console.log({ result });
                    if (result != null || result != '') {
                        window.location.href = result;
                    }
                    else{
                        this.loginerror = "Username or password not matched";
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.reloadpage = true;
                    this.template.querySelectorAll('c-ts_-error-component')[0].openModal();
                });
        }
    }
}