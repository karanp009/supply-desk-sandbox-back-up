import { LightningElement, track } from 'lwc';

import ts_approve from '@salesforce/resourceUrl/ts_approve';
import ts_print from "@salesforce/resourceUrl/ts_print";
import ts_view from "@salesforce/resourceUrl/ts_view";

import getTimesheet from "@salesforce/apex/ts_TimesheetController.getTimesheet";

export default class Ts_Timesheet extends LightningElement {

    viewIcon = ts_view;
    printIcon = ts_print;
    approveIcon = ts_approve;

    @track activeTimeSheet = [];
    // @track historicalTimeSheet = [];

    connectedCallback() {
        var status = " 'Submitted' ";
        this.timesheetListGenrater(status);
    }


    timesheetListGenrater(status) {
        console.log("status ====>" + status);
        getTimesheet({ timesheetStatus: status })
            .then((result) => {
                this.activeTimeSheet = result;
                console.log("result from apex class ==>" + result);
                console.log("result from apex class ==>", result);
                console.log({ result });
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

}