declare module "@salesforce/apex/ts_TimesheetController.getTimesheet" {
  export default function getTimesheet(param: {timesheetStatus: any}): Promise<any>;
}
declare module "@salesforce/apex/ts_TimesheetController.approveRejectTimeSheet" {
  export default function approveRejectTimeSheet(param: {timesheetId: any, operation: any, notes: any, ratingValue: any, rqc: any}): Promise<any>;
}
declare module "@salesforce/apex/ts_TimesheetController.sendMessageToJobOwner" {
  export default function sendMessageToJobOwner(param: {timesheetId: any, message: any}): Promise<any>;
}
declare module "@salesforce/apex/ts_TimesheetController.getTimesheetDetails" {
  export default function getTimesheetDetails(param: {timesheetId: any}): Promise<any>;
}
