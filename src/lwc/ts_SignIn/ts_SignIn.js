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

    passwordimg = communityicon + '/communityicons/password.png';;
    bglogo = communityicon + '/communityicons/supplydesk_logo.png';;
    userimg = communityicon + '/communityicons/username.png';;
    @track isSpinner = false;                        // for loading spinner 
    username;
    password;


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

    handleChange(event) {
        console.log(event.target.value);
        if (event.target.name == 'username') {
            this.username = event.target.value;
            this.handleValidate();
        } else if (event.target.name == 'password') {
            this.password = event.target.value;
        } 
    }

    login() {
        doLogin({
            username: this.username,
            password: this.password
        })
            .then((result) => {
                console.log({ result });
                if (result != null || result != '') {
                    window.location.href = result;
                }
            })
            .catch((error) => {
                console.log(error);
                this.reloadpage = true;
                this.template.querySelectorAll('c-ts_-error-component')[0].openModal();
            });
    }


    handleValidate() {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let userNameField = this.template.querySelector('[data-id="user-sgn-fld"]');
        var userName = this.username;

        if (userName.match(emailRegex)) {
            userNameField.setCustomValidity("");
        } else {
            // alert("Enter valid user name");
            userNameField.setCustomValidity("Please Enter Valid User Name");
        }
    }




}