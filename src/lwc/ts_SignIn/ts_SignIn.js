import { LightningElement, wire, track } from 'lwc';
import uname_img from '@salesforce/resourceUrl/usernameimg';
import passw_img from '@salesforce/resourceUrl/passwordimg';
import sd_logo from '@salesforce/resourceUrl/SD_Logo';
import { loadStyle } from 'lightning/platformResourceLoader';
import commstyle from '@salesforce/resourceUrl/CommunityCSS';
import doLogin from '@salesforce/apex/tS_SignInController.doLogin';
// import { NavigationMixin } from 'lightning/navigation';

// export default class Ts_SignIn extends NavigationMixin(LightningElement) {
export default class Ts_SignIn extends LightningElement {

    bglogo = sd_logo;
    userimg = uname_img;
    passwordimg = passw_img;
    username;
    password;

    connectedCallback() {
    

        var meta = document.createElement("meta");
        meta.setAttribute("name", "viewport");
        meta.setAttribute("content", "width=device-width, initial-scale=1.0");
        document.getElementsByTagName('head')[0].appendChild(meta);
    }   
    renderedCallback() {
        
        Promise.all([
            loadStyle( this, commstyle )
            ]).then(() => {
                console.log( 'Files loaded' );
            })
            .catch(error => {
                console.log( error.body.message );
        });
    }

    handleChange(event){
        console.log(event.target.value);
        if(event.target.name == 'username'){
            this.username = event.target.value;
        }else if (event.target.name == 'password'){
            this.password = event.target.value;
        }else{
            console.log('else');
        }
    }

    login(){
        console.log('login');
        doLogin({ username: this.username,
                    password: this.password })
        .then((result) => {
            console.log({result});
            if (result != null || result != '') {
                window.location.href = result;
            }
        })
            .catch((error) => {
            console.log(error);
        });
    }
}