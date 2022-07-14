import { LightningElement, track, wire } from 'lwc';

import approveRejectTimeSheet from "@salesforce/apex/ts_TimesheetController.approveRejectTimeSheet";
import getTimesheetDetails from "@salesforce/apex/ts_TimesheetController.getTimesheetDetails";
import sendMessageToJobOwner from "@salesforce/apex/ts_TimesheetController.sendMessageToJobOwner";

import ts_reject_btn from '@salesforce/resourceUrl/ts_reject_btn';
import ts_approve_btn from '@salesforce/resourceUrl/ts_approve_btn';
import ts_popupmodal_close_btn from '@salesforce/resourceUrl/ts_popupmodal_close_btn';
import ts_send_btn from '@salesforce/resourceUrl/ts_send_btn';

import ts_Excelent from '@salesforce/resourceUrl/ts_Excelent';
import ts_VeryGood from '@salesforce/resourceUrl/ts_VeryGood';
import ts_Good from '@salesforce/resourceUrl/ts_Good';
import ts_RequireImprovments from '@salesforce/resourceUrl/ts_RequireImprovments';
import ts_Unsetisfy from '@salesforce/resourceUrl/ts_Unsetisfy';

import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import IMG_URL from '@salesforce/schema/User.FullPhotoUrl';

export default class Ts_TimesheetDetails extends LightningElement {
    rejectBtnIcon = ts_reject_btn;
    approveBtnIcon = ts_approve_btn;
    popupCloseBtnIcon = ts_popupmodal_close_btn;
    popupSendBtnIcon = ts_send_btn;

    excelentEmg = ts_Excelent;
    VeryGoodEmg = ts_VeryGood;
    goodEmg = ts_Good;
    requireImprovmentsEmg = ts_RequireImprovments;
    unsetisfyEmg = ts_Unsetisfy;
    timesheetId;

    @track loginUserId;                             // Loged In user Id
    @track userName;                                // Loged In user Name
    @track profImgUrl;                              // Loged in user profile Image URL

    @track isSpinner = false;                       // for loading spinner
    @track isClientRejectedModalOpen = false;       // Used IN popup Modal when Reject button Clicked.
    @track isClientApproveModalOpen = false;        // Used IN popup Modal when Approve button Clicked.
    @track isSendMessageModalOpen = false;          // Used IN popup Modal when send message button Clicked.
    @track tsObj = [];                              // Storing Timesheet Object From Wrapper class that return from apex class.
    @track tsdLst = [];                             // Storing TimesheetDetails Object List From Wrapper class that return from apex class.
    @track vacancyName;                             // Used for displaying vacancy Name.
    @track rejectionNotes = '';                     // Approver Notes For Rejection of time sheet.
    @track approveNotes = '';                       // Approver Notes For Approving of time sheet.
    @track messageToJobOwner = '';                  // Message For Job Owner when send message Clicked.
    @track selectedRetting = '';                    // Rating Value that selected in Approve Modal.
    @track requesteQualityCall = false;             // Rating Value that selected in Approve Modal.
    // @track isUserClient = true;                     // This variable shows that user is Client or Candidate.
    // @track isUserClient = '';                     // This variable shows that user is Client or Candidate.
    @track isUserClient;                     // This variable shows that user is Client or Candidate.


    @wire(getRecord, {
        recordId: USER_ID,
        fields: [NAME_FIELD, IMG_URL]
    }) wireuser({
        error,
        data
    }) {
        if (error) {
            this.error = error;
        } else if (data) {
            this.userName = data.fields.Name.value;
            console.log('this.uName-->', this.userName);
            this.profImgUrl = data.fields.FullPhotoUrl.value;
            console.log('this.profImgUrl-->', this.profImgUrl);
        }
    }



    connectedCallback() {
        this.isSpinner = true;
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.timesheetId = urlParams.get('id');

        // var timesheetId = "a0y0C000006iUzGQAU";
        getTimesheetDetails({ timesheetId: this.timesheetId })
            .then((result) => {
                console.log({ result });
                this.tsObj = result.timesheet;
                this.vacancyName = result.timesheet.TR1__Job_Order__r.TR1__Job_Title__c;
                this.tsdLst = result.timesheetDetailsList;
                this.isUserClient = result.isClient;
                console.log("connected CallBack from this tsObj ==>", this.tsObj);
                console.log("connected CallBack from this tsdLst ==>", this.tsdLst);
                console.log("connected CallBack from this isUserClient ==>", this.isUserClient);
                this.isSpinner = false;
            })
            .catch((error) => {
                this.isSpinner = false;
                if (error) {
                    if (Array.isArray(error.body)) {
                        this.errorMsg = error.body.map((e) => e.message).join(", ");
                    } else if (typeof error.body.message === "string") {
                        this.errorMsg = error.body.message;
                    }
                }
            });
    }

    approveTimesheet() {
        console.log("approve Timesheet Clicked ===>");
        // var timesheetId = "a0y0C000006iUzGQAU";
        var operation = "Approve";
        var notes = this.approveNotes;
        var ratingValue = this.selectedRetting;
        var rqc = this.requesteQualityCall;

        if (ratingValue == "Excellent" || ratingValue == "Very Good") {
            console.log("1 if condition notes ===>" + notes);
            approveRejectTimeSheet({ operation: operation, timesheetId: this.timesheetId, notes: notes, ratingValue: ratingValue, rqc: rqc })
                .then((result) => {
                    console.log("result from apex class ==>" + result);
                    this.isClientApproveModalOpen = false;
                })
                .catch((error) => {
                    if (error) {
                        if (Array.isArray(error.body)) {
                            this.errorMsg = error.body.map((e) => e.message).join(", ");
                        } else if (typeof error.body.message === "string") {
                            this.errorMsg = error.body.message;
                        }
                    }
                });
        } else {
            if (notes != null || notes != '') {
                console.log("2 if condition notes ===>" + notes);
                approveRejectTimeSheet({ operation: operation, timesheetId: this.timesheetId, notes: notes, ratingValue: ratingValue, rqc: rqc })
                    .then((result) => {
                        console.log("result from apex class ==>" + result);
                        this.isClientApproveModalOpen = false;
                    })
                    .catch((error) => {
                        if (error) {
                            if (Array.isArray(error.body)) {
                                this.errorMsg = error.body.map((e) => e.message).join(", ");
                            } else if (typeof error.body.message === "string") {
                                this.errorMsg = error.body.message;
                            }
                        }
                    });
            }
        }
    }

    rejectTimesheet() {
        console.log("reject Timesheet Clicked ===>");
        // var timesheetId = "a0y0C000006iUzGQAU";
        var operation = "Reject";
        var notes = this.rejectionNotes.trim();
        // this.isClientRejectedModalOpen = true;
        console.log("text field of rejection ===>" + notes);
        approveRejectTimeSheet({ operation: operation, timesheetId: this.timesheetId, notes: notes })
            .then((result) => {
                console.log("result from apex class ==>" + result);
            })
            .catch((error) => {
                if (error) {
                    if (Array.isArray(error.body)) {
                        this.errorMsg = error.body.map((e) => e.message).join(", ");
                    } else if (typeof error.body.message === "string") {
                        this.errorMsg = error.body.message;
                    }
                }
            });
    }

    sendMessage() {
        console.log("Send Message Clicked ===>");
        // var timesheetId = "a0y0C000006iUzGQAU";
        var message = this.messageToJobOwner.trim();
        console.log("text field of messageToJobOwner ===>" + message);

        sendMessageToJobOwner({ timesheetId: this.timesheetId, message: message })
            .then((result) => {
                console.log("result from apex class ==>" + result);
                this.isSendMessageModalOpen = false;
            })
            .catch((error) => {
                if (error) {
                    if (Array.isArray(error.body)) {
                        this.errorMsg = error.body.map((e) => e.message).join(", ");
                    } else if (typeof error.body.message === "string") {
                        this.errorMsg = error.body.message;
                    }
                }
            });
    }

    selectRating(event) {
        // var pvalue = event.currentTarget.dataset.id;
        this.selectedRetting = event.currentTarget.dataset.id;
        console.log("selected Imogi value ====>" + this.selectedRetting);
    }

    saveRejectionNotes(event) {
        this.rejectionNotes = event.detail.value;
        // console.log("text field of rejection ===>" + this.rejectionNotes);
    }

    saveApproveNotes(event) {
        this.approveNotes = event.detail.value;
        console.log("text field of Approve ===>" + this.approveNotes);
    }

    saveMessageForJobOwner(event) {
        this.messageToJobOwner = event.detail.value;
        // console.log("text field of messageToJobOwner ===>" + this.messageToJobOwner);
    }

    closeRejectModal() {
        this.isClientRejectedModalOpen = false;
        this.isClientApproveModalOpen = false;
        this.isSendMessageModalOpen = false;
    }
    openRejectModal() {
        this.isClientRejectedModalOpen = true;
    }
    openApproveModal() {
        this.isClientApproveModalOpen = true;
    }
    openMessageModal() {
        this.isSendMessageModalOpen = true;
    }
}