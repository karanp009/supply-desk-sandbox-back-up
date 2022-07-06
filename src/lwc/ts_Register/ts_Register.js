import { LightningElement, track, wire } from 'lwc';
import uname_img from '@salesforce/resourceUrl/usernameimg';
import passw_img from '@salesforce/resourceUrl/passwordimg';
import sd_logo from '@salesforce/resourceUrl/SD_Logo';

export default class Ts_Register extends LightningElement {


    bglogo = sd_logo;
    userimg = uname_img;
    passwordimg = passw_img;

    connectedCallback() {
    
    }   
}