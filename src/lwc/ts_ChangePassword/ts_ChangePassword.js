import { LightningElement,track,wire } from 'lwc';
import changePassIcon from '@salesforce/resourceUrl/changePassIcon';
import cancelIcon from '@salesforce/resourceUrl/cancelIcon';
 
export default class Ts_ChangePassword extends LightningElement {

    changePassImg = changePassIcon;
    cancelImg = cancelIcon;
}