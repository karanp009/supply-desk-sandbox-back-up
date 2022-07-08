import { LightningElement, track } from 'lwc';

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



    @track isClientRejectedModalOpen = false;       // Used IN popup Modal when Reject button Clicked.
    @track isClientApproveModalOpen = true;         // Used IN popup Modal when Approve button Clicked.
    @track isSendMessageModalOpen = false;          // Used IN popup Modal when send message button Clicked.
    @track tsObj = [];                              // Storing TimesheetObject From Wrapper class that return from apex class.
    @track vacancyName;                             // Used for displaying vacancy Name.
    @track rejectionNotes = '';                     // Approver Notes For Rejection of time sheet.
    @track approveNotes = '';                       // Approver Notes For Approving of time sheet.
    @track messageToJobOwner = '';                  // Message For Job Owner when send message Clicked.

    connectedCallback() {
        var timesheetId = "a0y0C000006iUzGQAU";
        getTimesheetDetails({ timesheetId: timesheetId })
            .then((result) => {
                this.tsObj = result.timesheet;
                this.vacancyName = result.timesheet.TR1__Job_Order__r.TR1__Job_Title__c;
                console.log("connected CallBack from this tsObj ==>", this.tsObj);

            })
            .catch((error) => {
                this.applicantsTarget = undefined;
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
        var timesheetId = "a0y0C000006iUzGQAU";
        var operation = "Approve";

        approveRejectTimeSheet({ operation: operation, timesheetId: timesheetId })
            .then((result) => {
                console.log("result from apex class ==>" + result);
                this.isClientRejectedModalOpen = false;
            })
            .catch((error) => {
                this.applicantsTarget = undefined;
                if (error) {
                    if (Array.isArray(error.body)) {
                        this.errorMsg = error.body.map((e) => e.message).join(", ");
                    } else if (typeof error.body.message === "string") {
                        this.errorMsg = error.body.message;
                    }
                }
            });
    }

    rejectTimesheet() {
        console.log("reject Timesheet Clicked ===>");
        var timesheetId = "a0y0C000006iUzGQAU";
        var operation = "Reject";
        var notes = this.rejectionNotes.trim();
        this.isClientRejectedModalOpen = true;
        console.log("text field of rejection ===>" + notes);
        approveRejectTimeSheet({ operation: operation, timesheetId: timesheetId, notes: notes })
            .then((result) => {
                console.log("result from apex class ==>" + result);
            })
            .catch((error) => {
                this.applicantsTarget = undefined;
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
        var timesheetId = "a0y0C000006iUzGQAU";
        var message = this.messageToJobOwner.trim();
        console.log("text field of messageToJobOwner ===>" + message);

        sendMessageToJobOwner({ timesheetId: timesheetId, message: message })
            .then((result) => {
                console.log("result from apex class ==>" + result);
                this.isSendMessageModalOpen = false;
            })
            .catch((error) => {
                this.applicantsTarget = undefined;
                if (error) {
                    if (Array.isArray(error.body)) {
                        this.errorMsg = error.body.map((e) => e.message).join(", ");
                    } else if (typeof error.body.message === "string") {
                        this.errorMsg = error.body.message;
                    }
                }
            });
    }

    saveRejectionNotes(event) {
        this.rejectionNotes = event.detail.value;
        console.log("text field of rejection ===>" + this.rejectionNotes);
    }

    saveApproveNotes(event) {
        this.approveNotes = event.detail.value;
        console.log("text field of Approve ===>" + this.approveNotes);
    }

    saveMessageForJobOwner(event) {
        this.messageToJobOwner = event.detail.value;
        console.log("text field of messageToJobOwner ===>" + this.messageToJobOwner);
    }

    closeRejectModal() {
        this.isClientRejectedModalOpen = false;
        this.isClientApproveModalOpen = false;
        this.isSendMessageModalOpen = false;
    }
}