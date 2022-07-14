declare module "@salesforce/apex/FullCalendarController.fetchEvents" {
  export default function fetchEvents(): Promise<any>;
}
declare module "@salesforce/apex/FullCalendarController.createEvent" {
  export default function createEvent(param: {event: any}): Promise<any>;
}
declare module "@salesforce/apex/FullCalendarController.deleteEvent" {
  export default function deleteEvent(param: {eventid: any}): Promise<any>;
}
