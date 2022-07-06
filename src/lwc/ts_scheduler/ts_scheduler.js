import { LightningElement, track, wire } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import FullCalendarJS from '@salesforce/resourceUrl/FullCalendarJS';
import getAvailbilityData from '@salesforce/apex/ts_schedulercontroller.getAvailbilityData';
import deleteCalEvent from '@salesforce/apex/ts_schedulercontroller.deleteCalEvent';
import createAvailMap from '@salesforce/apex/ts_schedulercontroller.createAvailMap';
import { refreshApex } from '@salesforce/apex';
/**
 * @description: FullcalendarJs class with all the dependencies
 */
export default class FullCalendarJs extends LightningElement {
  //To avoid the recursion from renderedcallback
  fullCalendarJsInitialised = false;
  value = 'Available';
  //Fields to store the event data -- add all other fields you want to add
  title;
  startDate;
  endDate;
  typeValue;

  eventsRendered = false; //To render initial events only once
  openSpinner = false; //To open the spinner in waiting screens
  openModal = false; //To open form

  @track
  events = []; //all calendar events are stored in this field

  get options() {
    return [
      { label: 'None', value: 'None' },
      { label: 'Unavailable', value: 'unavailable' },
      { label: 'Interview', value: 'Interview' },
      { label: 'Working With Other Agency', value: 'WWOT' },
      { label: 'Sick', value: 'sick' },
      { label: 'Holiday', value: 'holiday' },
      { label: 'Available', value: 'available' },
    ];
  }

  /**
   * Load the fullcalendar.io in this lifecycle hook method
   */
  renderedCallback() {
    // Performs this operation only on first render
    if (this.fullCalendarJsInitialised) {
      return;
    }
    this.fullCalendarJsInitialised = true;

    // Executes all loadScript and loadStyle promises
    // and only resolves them once all promises are done
    Promise.all([
      loadScript(this, FullCalendarJS + '/FullCalendarJS/jquery.min.js'),
      loadScript(this, FullCalendarJS + '/FullCalendarJS/moment.min.js'),
      loadScript(this, FullCalendarJS + '/FullCalendarJS/fullcalendar.min.js'),
      loadStyle(this, FullCalendarJS + '/FullCalendarJS/fullcalendar.min.css'),
    ])
      .then(() => {
        //initialize the full calendar
        this.initializeCalendar();
        this.newMethod();
        const ele = this.template.querySelector('div.fullcalendarjs');
        const modal = this.template.querySelector('div.modalclass');
      })
      .catch((error) => {
        console.error({
          message: 'Error occured on FullCalendarJS',
          error,
        });
      });
  }

  newMethod() {
    createAvailMap({})
      .then((result) => {
        console.log({ result });
      })
  }



  initializeCalendar() {
    getAvailbilityData({})
      .then((result) => {
        const ele = this.template.querySelector('div.fullcalendarjs');
        const modal = this.template.querySelector('div.modalclass');
        console.log(FullCalendarJS);


        var self = this;

        //To open the form with predefined fields
        //TODO: to be moved outside this function
        function openActivityForm(mainStartDate, mainEndDate) {
          console.log('modal is opeaned!!!');
          self.startDate = mainStartDate;
          self.endDate = mainEndDate;
          self.openModal = true;
          self.typeValue = null;
        }

        //Actual fullcalendar renders here - https://fullcalendar.io/docs/v3/view-specific-options
        $(ele).fullCalendar({

          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay',
          },
          defaultDate: new Date(), // default day is today - to show the current date
          defaultView: 'agendaWeek', //To display the default view - as of now it is set to week view
          navLinks: true, // can click day/week names to navigate views
          // editable: true, // To move the events on ?calendar - TODO
          selectHelper: true,
          firstDay: 1,
          selectable: true, //To select the period of time

          //To select the time period : https://fullcalendar.io/docs/v3/select-method
          select: function (startDate, endDate) {
            let stDate = startDate.toJSON().slice(0, 10);

            let startDateFront = startDate.format();
            let timeSplitstart = startDateFront.split('T');
            let mainStartDate = stDate + 'T' + timeSplitstart[1];

            let edDate = endDate.toJSON().slice(0, 10);
            let endDateFront = endDate.format();
            console.log({ endDateFront });
            let timeSplitend = endDateFront.split('T');
            let mainEndDate = edDate + 'T' + timeSplitend[1];



            console.log({ edDate });
            // let today = new Date().toISOString();
            var today = new Date().toJSON().slice(0, 10);
            console.log({ today });

            if (stDate >= today) {
              openActivityForm(mainStartDate, mainEndDate);
            } else {
              window.alert('Cannot create event for date less than today');
              window.location.reload();
            }

          },

          // dayClick: function (date, jsEvent, view) {

          //   var today = new Date().setHours(0, 0, 0, 0);
          //   var dateStr = moment().format(date);
          //   console.log('### dateStr=' + dateStr);
          //   if (!(date < today)) {
          //     getAvailbilityData(dateStr);
          //     this.open = true;
          //   }

          // },

          eventLimit: true, // allow "more" link when too many events
          events: this.events, // all the events that are to be rendered - can be a duplicate statement here

        });

      })

  }


  //To close the modal form
  handleCancel(event) {
    this.openModal = false;
  }

  escapeModal(event) {
    if (event.key == 'Escape' || event.key == 'Esc') {
      this.modal = false;
    }
  }

  /**
  *  @description open the modal by nullifying the inputs and these events will be shows on left sidebar
  */
  addEvent(event) {
    this.startDate = null;
    this.endDate = null;
    this.title = null;
    this.typeValue = null;
    // this.typeValue = 'Available';
    this.openModal = true;
    console.log({ event });
  }

  handleKeyup(event) {
    // handleChange(event) {
    this.title = event.target.value;
    console.log(this.title);
  }


  handleChange(event) {
    this.value = event.target.value;
    console.log(this.value);
  }

  //To save the event
  handleSave(event) {
    let events = this.events;
    this.openSpinner = true;
    console.log({ events });

    //get all the field values - as of now they all are mandatory to create a standard event
    //TODO- you need to add your logic here.
    this.template.querySelectorAll('lightning-input').forEach((ele) => {
      if (ele.name === 'title') {
        this.title = ele.value;
      }
      // if (ele.name === 'type') {
      //   this.typeValue = this.target.label;
      // }
      if (ele.name === 'start') {
        this.startDate = ele.value.includes('.000Z')
          ? ele.value
          : ele.value + '.000Z';
      }
      if (ele.name === 'end') {
        this.endDate = ele.value.includes('.000Z')
          ? ele.value
          : ele.value + '.000Z';
      }
    });

    //format as per fullcalendar event object to create and render
    let newevent = {
      title: this.title,
      typeValue: this.options.label,
      start: this.startDate,
      end: this.endDate,
    };
    console.log(this.events);

    //Close the modal
    this.openModal = false;
    //Server call to create the event
    //TODO pass createAvailMap to create event 
    getAvailbilityData({ event: JSON.stringify(newevent) })
      .then((result) => {

        const ele = this.template.querySelector('div.fullcalendarjs');

        //To populate the event on fullcalendar object
        //Id should be unique and useful to remove the event from UI - calendar
        newevent.id = result;

        //renderEvent is a fullcalendar method to add the event to calendar on UI
        //Documentation: https://fullcalendar.io/docs/v3/renderEvent
        $(ele).fullCalendar('renderEvent', newevent, true);

        //To display on UI with id from server
        this.events.push(newevent);

        //To close spinner and modal
        this.openSpinner = false;

        //show toast message
        this.showNotification(
          'Success!!',
          'Your event has been logged',
          'success'
        );

      })
      .catch((error) => {
        console.log(error);
        this.openSpinner = false;

        //show toast message - TODO
        this.showNotification(
          'Oops',
          'Something went wrong, please review console',
          'error'
        );
      });

  }

  /**
   * @description: remove the event with id
   * @documentation: https://fullcalendar.io/docs/v3/removeEvents
   */
  removeEvent(event) {
    //open the spinner
    this.openSpinner = true;

    //delete the event from server and then remove from UI
    let eventid = event.target.value;
    deleteCalEvent({ eventid: eventid })
      .then((result) => {
        console.log('result -------------delete--->' + result);
        const ele = this.template.querySelector('div.fullcalendarjs');
        console.log(eventid);
        $(ele).fullCalendar('removeEvents', [eventid]);
        console.log('eventid in delete is ------> ' + eventid);

        this.openSpinner = false;

        //refresh the grid
        return refreshApex(this.eventOriginalData);
      })
      .catch((error) => {
        console.log(error);
        this.openSpinner = false;
      });
  }

  /**
  * @description method to show toast events
  */
  showNotification(title, message, variant) {
    console.log('enter');
    const evt = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant,
    });
    this.dispatchEvent(evt);
  }

  showErrorToast() {
    const evt = new ShowToastEvent({
      title: 'Toast Error',
      message: 'Some unexpected error',
      variant: 'error',
      mode: 'dismissable'
    });
    this.dispatchEvent(evt);
  }

}