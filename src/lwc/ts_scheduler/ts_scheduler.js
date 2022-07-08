/*
 * Author :  Naimish Kalena
 * Created on June 28 2022
 * Company :  MV Clouds Private Limited
 * Description : To display a Calendar which can schedule and show dates and events 
 */


import { LightningElement, track, wire } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import FullCalendarJS from '@salesforce/resourceUrl/FullCalendarJS';
import getAvailbilityData from '@salesforce/apex/ts_schedulercontroller.getAvailbilityData';
import deleteCalEvent from '@salesforce/apex/ts_schedulercontroller.deleteCalEvent';
import createAvailMap from '@salesforce/apex/ts_schedulercontroller.createAvailMap';
import saveCreateAvailRecord from '@salesforce/apex/ts_schedulercontroller.saveCreateAvailRecord';
import fetchData from '@salesforce/apex/ts_schedulercontroller.fetchData';
// import createAccountContacts from '@salesforce/apex/ts_schedulercontroller.createAccountContacts';
import { refreshApex } from '@salesforce/apex';
/**
 * @description: FullcalendarJs class with all the dependencies
 */
export default class FullCalendarJs extends LightningElement {
  //To avoid the recursion from renderedcallback
  fullCalendarJsInitialised = false;
  value = 'available';
  //Fields to store the event data -- add all other fields you want to add
  title;
  startDate;
  endDate;
  typeValue;


  wrapp = [];

  //To store the orignal wire object to use in refreshApex method
  eventOriginalData = [];

  eventsRendered = false; //To render initial events only once
  openSpinner = false; //To open the spinner in waiting screens
  openModal = false; //To open form

  @track
  events = []; //all calendar events are stored in this field

  get options() {
    return [
      { label: 'None', value: 'None' },
      { label: 'Unavailable', value: 'Unavailable' },
      { label: 'Interview', value: 'Interview' },
      { label: 'Working With Other Agency', value: 'Working With Other Agency' },
      { label: 'Sick', value: 'Sick' },
      { label: 'Holiday', value: 'Holiday' },
      { label: 'Available', value: 'Available' },
      { label: 'Booked', value: 'Booked' },
      // { label: 'Full Day', value: 'Full Day' },
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
        this.newMethod2();
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

  connectedCallback() {
    // this.abRequest = {}
    this.wrapp = {};
    this.wrapp.startDate = '';
    this.wrapp.EndDate = '';
    this.wrapp.TypeValue = '';
  }

  newMethod() {
    createAvailMap({})
      .then((result) => {
        console.log({ result });
      })
  }

  newMethod2() {
    saveCreateAvailRecord({})
      .then((result) => {
        console.log({ result });
      })
  }

  //Get data from server - in this example, it fetches from the event object
  @wire(fetchData)
  eventObj(value) {
    this.eventOriginalData = value; //To use in refresh cache

    console.log({ value });

    const { data, error } = value;
    if (data) {
      //format as fullcalendar event object
      console.log(data);
      let events = data.map((event) => {
        return {
          id: event.Id,
          start: event.Start_Date_Time__c,
          end: event.End_Date_Time__c,
          typeValue: event.Type__c,           //to get the type values from backend
        };
      });
      this.events = JSON.parse(JSON.stringify(events));
      console.log(this.events);
      this.error = undefined;

      //load only on first wire call -
      // if events are not rendered, try to remove this 'if' condition and add directly
      if (!this.eventsRendered) {
        //Add events to calendar
        const ele = this.template.querySelector('div.fullcalendarjs');
        $(ele).fullCalendar('renderEvents', this.events, true);
        this.eventsRendered = true;
      }
    } else if (error) {
      this.events = [];
      this.error = 'No events are found';
    }
  }


  initializeCalendar() {
    // getAvailbilityData({})
    // .then((result) => {
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
      // locale: 'es',   // This is an acronym for the locale you want to select
      defaultDate: new Date(), // default day is today - to show the current date
      defaultView: 'agendaWeek', //To display the default view - as of now it is set to week view
      navLinks: true, // can click day/week names to navigate views
      // editable: true, // To move the events on ?calendar - TODO
      selectHelper: true,
      firstDay: 1,
      selectable: true, //To select the period of time
      // eventBackgroundColor: '#378006',
      // eventBorderColor: '#fff',
      // eventTextColor: '#FFF',

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

      //to identify log when clicked on the event
      eventClick: function (info) {
        console.log({ info });
        var eventObj = info.typeValue + ' ------------ ' + info.id;
        console.log({ eventObj });
        // if (eventObj.typeValue) {
        //   alert('Event Name = ' + eventObj.typeValue);
        //   console.log('Event Name = ' + eventObj.typeValue);
        // }
      },

      eventLimit: true, // allow "more" link when too many events
      events: this.events, // all the events that are to be rendered - can be a duplicate statement here

      eventRender: function (info, element) {
        console.log({ element });
        // element.find('.fc-title').append("<br/>" + 'Test');
        // const d = new Date();
        element.find('.fc-content').append("<br/>" + info.typeValue);

        //to set the colors of the events from typeValue
        if (info.typeValue == 'Available') {
          element.css('background-color', '#008000');
        } else if (info.typeValue == 'Unavailable') {
          element.css('background-color', '#B2B2B2');
        } else if (info.typeValue == 'Interview') {
          element.css('background-color', '#B2B2B2');
        } else if (info.typeValue == 'Holiday') {
          element.css('background-color', '#B2B2B2');
        }
        //  else if (info.typeValue == 'Full Day') {
        //   element.css('background-color', '#008000');
        // } 
        else if (info.typeValue == 'Sick') {
          element.css('background-color', '#B2B2B2');
        } else if (info.typeValue == 'Working With Other Agency') {
          element.css('background-color', '#B2B2B2');
        } else if (info.typeValue == 'Booked') {
          element.css('background-color', '#D95252');
        }
      }
    });

    // })
  }

  //To close the modal form
  handleCancel(event) {
    this.openModal = false;
  }

  escapeModal(event) {
    if (event.key == 'Escape' || event.key == 'Esc') {
      this.openModal = false;
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
    console.log({ event });
    console.log(event.target.value);
    this.wrapp.TypeValue = event.target.value;

    this.typeValue = event.target.value;      //?used to display it on the main pagee
    console.log(this.value);
  }

  //To save the event
  handleSave(event) {
    let events = this.events;
    this.openSpinner = true;
    console.log({ events });

    // let mainStartvar = startDateVar.toJSON();
    // console.log({ mainStartvar });
    //   var dsd = this.startDate;
    // let fgf = dsd.toJSON();
    // console.log({fgf});


    // var account=
    // {
    //     Name:'Ravi',
    //     // NumberOfEmployees:2,
    //     // Contacts:this.contacts
    // };
    // createAccountContacts({ wrapperText: JSON.stringify(this.wrapp) })
    //   .then(result => {
    //     console.log('Data:' + JSON.stringify(result));
    //   }).catch(error => {
    //     console.log(error);
    //     this.error = error;
    //   });

    // let vartest = this.startDate;
    // let vartest = new Date();
    // console.log(vartest.toISOString());

    this.wrapp.typeValue = this.typeValue;      //? for passing value to backend
    this.wrapp.startDate = this.startDate;
    // this.wrapp.startDate = this.startDate.toJSON();
    this.wrapp.EndDate = this.endDate;
    // this.wrapp.EndDate = this.endDate.toJSON();
    // this.wrapp.startDate = this.startDate.formatDate('YYYY-MM-DDTHH:mm:ss.sssZ');
    // this.wrapp.EndDate = this.endDate.formatDate('YYYY-MM-DDTHH:mm:ss.sssZ');
    console.log(this.wrapp.startDate);
    console.log(this.wrapp.EndDate);
    console.log(this.wrapp);

    var aaa = this.wrapp;
    console.log({ aaa });


    //get all the field values - as of now they all are mandatory to create a standard event
    //TODO- you need to add your logic here.
    this.template.querySelectorAll('lightning-input').forEach((ele) => {
      if (ele.name === 'title') {
        this.title = ele.value;
      }
      // if (ele.name === 'Type') {
      //   this.typeValue = ele.value;
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
      typeValue: this.typeValue,
      start: this.startDate,
      end: this.endDate,
    };
    console.log(this.events);

    //Close the modal
    this.openModal = false;
    //Server call to create the event
    //TODO pass createAvailMap to create event 
    // getAvailbilityData({ event: JSON.stringify(newevent) })

    let wrapD = JSON.stringify(aaa);
    console.log({ wrapD });

    var wrdata = JSON.stringify(this.wrapp);
    console.log({ wrdata });

    /**
   * @description: When user clicks on the save button it saves the event in the backend and in the calendar
   */
    // createAvailMap({ wrapperdata: wrdata })
    saveCreateAvailRecord({ wrapperdata: wrdata })
      .then((result) => {

        const ele = this.template.querySelector('div.fullcalendarjs');

        //To populate the event on fullcalendar object
        //Id should be unique and useful to remove the event from UI - calendar
        newevent.id = result;

        //renderEvent is a fullcalendar method to add the event to calendar on UI
        //Documentation: https://fullcalendar.io/docs/v3/renderEvent
        $(ele).fullCalendar('renderEvent', newevent, true);

        //To display on UI with id from server
        console.log(newevent.id);
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