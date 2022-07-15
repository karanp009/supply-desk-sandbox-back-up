import { LightningElement, track } from 'lwc';
import ts_approve from '@salesforce/resourceUrl/ts_approve';
import ts_reject from '@salesforce/resourceUrl/ts_reject';
import ts_print from "@salesforce/resourceUrl/ts_print";
import ts_view from "@salesforce/resourceUrl/ts_view";
import getTimesheet from "@salesforce/apex/ts_TimesheetController.getTimesheet";
import { NavigationMixin } from 'lightning/navigation';
import approveRejectTimeSheet from "@salesforce/apex/ts_TimesheetController.approveRejectTimeSheet";

import ts_Excelent from '@salesforce/resourceUrl/ts_Excelent';
import ts_VeryGood from '@salesforce/resourceUrl/ts_VeryGood';
import ts_Good from '@salesforce/resourceUrl/ts_Good';
import ts_RequireImprovments from '@salesforce/resourceUrl/ts_RequireImprovments';
import ts_Unsetisfy from '@salesforce/resourceUrl/ts_Unsetisfy';
import ts_approve_btn from '@salesforce/resourceUrl/ts_approve_btn';
import ts_reject_btn from '@salesforce/resourceUrl/ts_reject_btn';
import no_timesheet_found_img from '@salesforce/resourceUrl/no_timesheet_found_img';

export default class Ts_Timesheet extends NavigationMixin(LightningElement) {

    viewIcon = ts_view;
    printIcon = ts_print;
    approveIcon = ts_approve;
    rejectIcon = ts_reject;

    @track activeTimeSheet = [];                     // Used For Displaying List of Timesheet.
    @track isSpinner = false;                        // for loading spinner 
    @track isClientApproveModalOpen = false;         // Used IN popup Modal when Approve button Clicked.
    @track selectedRetting = '';                     // Rating Value that selected in Approve Modal.
    @track approveNotes = '';                        // Approver Notes For Approving of time sheet.
    @track isNoTimesheetRecord = false;              // for Displaying No Records Found.

    rejectBtnIcon = ts_reject_btn;
    approveBtnIcon = ts_approve_btn;
    excelentEmg = ts_Excelent;
    VeryGoodEmg = ts_VeryGood;
    goodEmg = ts_Good;
    requireImprovmentsEmg = ts_RequireImprovments;
    unsetisfyEmg = ts_Unsetisfy;
    no_recordImg = no_timesheet_found_img;
    selectedTimesheet;
    text_area_required = false;

    connectedCallback() {
        var status = " 'Submitted' ";
        this.timesheetListGenrater(status);
    }


    timesheetListGenrater(status) {
        this.isSpinner = true;
        console.log("status ====>" + status);
        getTimesheet({ timesheetStatus: status })
            .then((result) => {
                this.activeTimeSheet = result;
                console.log("result from apex class ==>" + result);
                console.log("result from apex class ==>", result);
                console.log({ result });
                console.log("result length ===>" + result.length);
                if (this.activeTimeSheet.length == 0) {
                    this.isNoTimesheetRecord = true;
                }

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

    displayActiveTimesheet(event) {
        console.log("Active time sheet called");
        this.template.querySelector('.active-timesheet-btn').classList.add('timesheet-btn-active');
        this.template.querySelector('.historical-timesheet-btn').classList.remove('timesheet-btn-active');

        var status = " 'Submitted' ";
        this.timesheetListGenrater(status);  // calling this method for getting list of Active Timesheet
    }

    displayHistoricalTimesheet(event) {
        console.log("Historical time sheet called");
        this.template.querySelector('.historical-timesheet-btn').classList.add('timesheet-btn-active');
        this.template.querySelector('.active-timesheet-btn').classList.remove('timesheet-btn-active');

        var status = " 'Approved' ";
        this.timesheetListGenrater(status);  // calling this method for getting list of Historical Timesheet

    }

    navigatepage(event) {
        console.log({ event });
        var urlValue = '/s/';
        var nameval = event.target.dataset.name;
        this.selectedTimesheet = event.target.dataset.id;
        console.log({ nameval });

        if (nameval == "View") {
            console.log('View');
            urlValue = urlValue + 'timesheet/timesheetdetail';

            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: 'TimeSheetDetail__c',
                    url: urlValue
                },
                state: {
                    id: this.selectedTimesheet // Value must be a string
                }
            });
        } else if (nameval == "Print") {
            console.log('Print');
            urlValue = urlValue + 'timesheet/timesheetpdf';

            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: 'TimesheetPDF__c',
                    url: urlValue
                },
                state: {
                    id: this.selectedTimesheet // Value must be a string
                }
            });
        } else if (nameval == "Approve") {
            console.log('Approve');
            this.isClientApproveModalOpen = true;
        }
    }

    // For Approve Popup
    selectRating(event) {
        // var pvalue = event.currentTarget.dataset.id;
        this.selectedRetting = event.currentTarget.dataset.id;
        console.log("selected Imogi value ====>" + this.selectedRetting);
        if(this.selectedRetting == "Excellent" || this.selectedRetting == "Very Good"){
            this.text_area_required = false;
        }
        else{
            this.text_area_required = true;
        }
    }
    saveApproveNotes(event) {
        this.approveNotes = event.detail.value;
        console.log("text field of Approve ===>" + this.approveNotes);
    }
    closeRejectModal() {
        this.isClientRejectedModalOpen = false;
        this.isClientApproveModalOpen = false;
        this.isSendMessageModalOpen = false;
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
            approveRejectTimeSheet({ operation: operation, timesheetId: this.selectedTimesheet, notes: notes, ratingValue: ratingValue, rqc: rqc })
                .then((result) => {
                    console.log("result from apex class ==>" + result);
                    this.isClientApproveModalOpen = false;
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
        else if (ratingValue.length > 0){
            console.log("1 to 3 rating");
            console.log("notes==>",notes);
            console.log("notes lenght==>",notes.length);
            this.text_area_required = true;
            if (notes != null || notes != '') {
                console.log("2 if condition notes ===>" + notes);
                approveRejectTimeSheet({ operation: operation, timesheetId: this.selectedTimesheet, notes: notes, ratingValue: ratingValue, rqc: rqc })
                    .then((result) => {
                        console.log("result from apex class ==>" + result);
                        this.isClientApproveModalOpen = false;
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
        }
    }
    rejectTimesheet() {
        console.log("reject Timesheet Clicked ===>");
        // var timesheetId = "a0y0C000006iUzGQAU";
        var operation = "Reject";
        var notes = this.rejectionNotes.trim();
        // this.isClientRejectedModalOpen = true;
        console.log("text field of rejection ===>" + notes);
        approveRejectTimeSheet({ operation: operation, timesheetId: this.selectedTimesheet, notes: notes })
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
}