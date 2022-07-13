import { LightningElement, track } from 'lwc';

import ts_popupmodal_close_btn from '@salesforce/resourceUrl/ts_popupmodal_close_btn';
import ts_successToast from '@salesforce/resourceUrl/ts_successToast';
import ts_errorToast from '@salesforce/resourceUrl/ts_errorToast';

export default class Ts_TostNotification extends LightningElement {

    popupCloseBtnIcon = ts_popupmodal_close_btn;
    successIcon = ts_successToast;
    errorIcon = ts_errorToast;

    @track messageType = "success";
    @track messageToDisplay = "Approved Succesfully";
    @track autoClose;
    @track autoCloseTime;
    @track isSuccess = true;
    @track isError;
    @track iconToDisplay

    connectedCallback() {
        this.checkType();
    }

    checkType() {
        if (this.messageType == "success") {
            var tsd = this.template.querySelectorAll('.inset-color-div');
            console.log({ tsd });
            // tsd.classList.add('success-msg-cls');
            this.isSuccess = true;
            this.iconToDisplay = this.successIcon;
        } else if (this.messageType == "error") {
            this.template.querySelector('.inset-color-div').classList.add('error-msg-cls');
            this.iconToDisplay = this.errorIcon;
        }
    }


}