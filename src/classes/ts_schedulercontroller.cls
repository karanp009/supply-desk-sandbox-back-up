/*
 * Author :  Naimish Kalena
 * Created on Thu Jun 30 2022
 * Company :  2022 MV Clouds Private Limited
 * Description : 
 */


public without sharing class ts_schedulercontroller {

     @AuraEnabled(cacheable = true)
     public static List<MainWrapper> getAvailbilityData(){
         List<MainWrapper> mainwrapList = new List<MainWrapper>();              //Main wrapper list everything passes down to this  , and it passes down to lwc
         Contact contact = new Contact();
         String contactId;
         TR1__Job__c tempVacancy = new TR1__Job__c();               //to find that is there a vacancy for the job
         Candidate_Availability__c tempCandidateAvailability = new Candidate_Availability__c();             // to create availability for the candidate
 		 Boolean isInternalUser;                // to check if the user is portal user
        //  String candidateEventString; // This will be JSON which will be pased on Page to show Candidate Availability in Calendar
         String cId = [SELECT Id FROM Contact WHERE ID =: UserInfo.getUserId()].ID;          //!to pass the contact Id of the logged in user need to change it later
        //  String cId = [SELECT Id FROM Contact WHERE ID =: UserInfo.getUserId()].ID;          //!to pass the contact Id of the logged in user need to change it later
        //  System.debug('cId ----> ' + cId);
         String eventId;                //used to delete an event    
        
         
        //to check if the user is portal user or not
     	if(isInternalUser == null){
       		isInternalUser = Utility.isInternalUser();
    	}

        //assign by default values for the current user
        contactId = cId;
         User currentUser = [SELECT Id, ContactId FROM User WHERE Id =: UserInfo.getUserId() LIMIT 1];
         if (String.isNotBlank(contactId) && (isInternalUser || contactId == currentUser.ContactId)) {
             tempVacancy = new TR1__Job__c(Start_Time__c='08:30 AM',End_Time__c='03:30 PM');
             tempCandidateAvailability = new Candidate_Availability__c(Type__c='Available');
             contact = RC_AccessController.getContactRecordById(contactId);
         }else {
             Utility.AddErrorMessage('No Contact found.');
         }
    
         //for start and end date
         Date startDate = tempVacancy.TR1__Estimated_Start_Date__c;
         Date EndDate = tempVacancy.TR1__Estimated_End_Date__c;


        //Main wrapper to assign variables
        MainWrapper mw = new MainWrapper();
        mw.contact = contact;
        mw.tempCandidateAvailability = tempCandidateAvailability;
        mw.tempVacancy = tempVacancy;
        mw.startDate = startDate;
        mw.EndDate = EndDate;
        mainwrapList.add(mw);
        System.debug('mainwrapList -->' + mainwrapList);
        return mainwrapList;
    }


    public class MainWrapper{
        @AuraEnabled public Contact contact;
        @AuraEnabled public Candidate_Availability__c tempCandidateAvailability;
        @AuraEnabled public TR1__Job__c tempVacancy;
        @AuraEnabled public Date startDate;
        @AuraEnabled public Date EndDate;
    }

    public static TR1__Job__c tempVacancy = new TR1__Job__c();               //to find that is there a vacancy for the job
    public static Candidate_Availability__c tempCandidateAvailability = new Candidate_Availability__c();             // to create availability for the candidate
    public static Boolean isWeekSelected;

    
    //passed in create event
    public class CalendarEvent {
        public String id;
        public String title {
            get;
            set;
        }
        public Boolean allDay = false;
        public String start;
        public String endDateTime;
        public String tooltip;
        public String description;
        public String color;
        public String textColor;
        public String tooltipTitle;
        public String tooltipStyleClass;
        public Boolean editable;
        public String status;
        public String shift;
        public String multi;
        public Boolean isDayBooked {
            get;
            set;
        }

        public CalendarEvent(Candidate_Availability__c ca) {

    String WHITECOLOR  = '#FFFFFF';
    
     Map<String, String> colorMap = new Map<String, String> {
        'AM'            => '#90D93F',
        'PM'            => '#90D93F',
        'Full Day'      => '#90D93F',
        'Available'      => '#90D93F',
        'Unavailable'   => '#B2B2B2',
        'Holiday'       => '#B2B2B2',
        'Interview'     => '#B2B2B2',
        'Sick'          => '#B2B2B2',
        'Working for Another Agency' => '#B2B2B2',
        'Booked'        => '#D95252'
    };
            
            this.status = ca.Type__c;
            this.isDayBooked = false;
            this.shift = status;
            this.start = ca.Start_Date_Time__c.format('MM/dd/yyyy hh:mm a');
            this.endDateTime = ca.End_Date_Time__c.format('MM/dd/yyyy hh:mm a');
            this.id = ca.id;
            this.color = colorMap.get(status);
            this.textColor = WHITECOLOR;
            this.tooltipStyleClass = 'ui-tooltip-shadow ui-tooltip-green';
            this.tooltiptitle = status;
            this.title = status;
            this.tooltip = status;

            tooltip = '<table width="100%">';
            tooltip += Utility.addTableRow('Status', ca.Type__c);
            tooltip += Utility.addTableRow('Start Time', ca.Start_Date_Time__c.format('dd/MM/yyyy hh:mm a'));       
            tooltip += Utility.addTableRow('End Time', ca.End_Date_Time__c.format('dd/MM/yyyy hh:mm a'));              
            tooltip += '</table>';
            this.description = tooltip; 
            
            // return ca;
        }

        public CalendarEvent(Candidate_Availability__c ca, Closing_Report_Schedule__c crs) {

         String WHITECOLOR  = '#FFFFFF';
    
     Map<String, String> colorMap = new Map<String, String> {
        'AM'            => '#90D93F',
        'PM'            => '#90D93F',
        'Full Day'      => '#90D93F',
        'Available'      => '#90D93F',
        'Unavailable'   => '#B2B2B2',
        'Holiday'       => '#B2B2B2',
        'Interview'     => '#B2B2B2',
        'Sick'          => '#B2B2B2',
        'Working for Another Agency' => '#B2B2B2',
        'Booked'        => '#D95252'
    };
    

            this.status = 'Booked';
            this.isDayBooked = false;
            this.shift = status;
            this.start = ca.Start_Date_Time__c.format('MM/dd/yyyy hh:mm a'); //It needs to be in this format as full calendar expects month first
            this.endDateTime = ca.end_Date_Time__c.format('MM/dd/yyyy hh:mm a');
            this.id = crs.id;
            this.color = colorMap.get(status);
            this.textColor = WHITECOLOR;
            this.tooltipStyleClass = 'ui-tooltip-shadow ui-tooltip-red';
            this.tooltipTitle = crs.Closing_Report__r.TR1__Job__r.Name; 
            this.tooltip = status;
            this.title = crs.Closing_Report__r.TR1__Job__r.Name;

            tooltip = '<table width="100%">';
            tooltip += Utility.addTableRow('Time',  ca.Start_Date_Time__c.format('dd/MM/yyyy hh:mm a') +'-'+ca.End_Date_Time__c.format('dd/MM/yyyy hh:mm a'));
            tooltip += Utility.addTableRow('Vacancy', String.isNotBlank(crs.Closing_Report__r.TR1__Job__r.Name) ? crs.Closing_Report__r.TR1__Job__r.Name : '');
            tooltip += Utility.addTableRow('Timesheet Approver', String.isNotBlank(crs.Closing_Report__r.TR1__Timesheet_Approver__r.Name) ? crs.Closing_Report__r.TR1__Timesheet_Approver__r.Name : '');
            tooltip += '</table>';
            this.description = tooltip;

            // List<String> passData = new List<String>();
            // passData.add(ca);
            // passData.add(crs);
            // return passData;
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Candidate_Availability__c> fetchData(){
        try {
            return [SELECT Id,Start_Date_Time__c,End_Date_Time__c,Candidate__c,Start_Date__c,End_Date__c,Type__c FROM Candidate_Availability__c ORDER BY CreatedDate DESC];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static String createAvailMap(String wrapperdata) {
    // public static Id createAvailMap(String wrapperdata) {

        // if (String.isBlank(wrapperdata)) {
        //     return null;
        // }

        // System.debug('wrapperdata==>'+wrapperdata);

        // wrapperclass wrapdata = (wrapperclass)JSON.deserialize(wrapperdata,wrapperclass.class);
        // System.debug('wrapdata Type-->'+wrapdata);
        // System.debug('wrapdata Type-->'+wrapdata.type);
        
        // List<wrapperclass> wraClass = new List<wrapperclass>();
        // wrapperclass op = new wrapperclass();
        // op.type = 
        // op.type = wrapperdata.type;
        // op.EndDate = wrapperdata.EndDate;
        // op.startDate = wrapperdata.startDate;
        // System.debug(op);
        // wraClass.add(op);
        // System.debug('create called wrapper class ----> ' + wraClass);
        

        String candidateEventString; // This will be JSON which will be pased on Page to show Candidate Availability in Calendar
        List<CalendarEvent> candidateEventList = new List<CalendarEvent>();
        String contactId = '0030C00000SPlMiQAL';            //todo need to change it to dynamic id
        System.debug('candidateEventList ----first declaration ->' + candidateEventList);
        candidateEventList.clear();
        candidateEventString='';
        
        Map<Id,Candidate_Availability__c> candidateAvailabilityMap = new Map<Id,Candidate_Availability__c>(RC_AccessController.getCandidateAvailabilityByContactId(contactId));
        System.debug('candidateAvailabilityMap -------> ' + candidateAvailabilityMap);
        Map<Id,Closing_Report_Schedule__c> closingReportScheduleMap = new Map<Id,Closing_Report_Schedule__c>();
        for(Closing_Report_Schedule__c crs : RC_AccessController.getClosingReportScheduleByCandidateAvailability(candidateAvailabilityMap)){
            closingReportScheduleMap.put(crs.Candidate_Availability__c,crs);
        System.debug('closingReportScheduleMap -------> ' + closingReportScheduleMap);
        System.debug('crs ------> ' + crs);

        }
            
        for(Candidate_Availability__c ca : candidateAvailabilityMap.values()){
            CalendarEvent calEvent_v2;
            if(closingReportScheduleMap.containsKey(ca.id)){
                calEvent_v2 = new CalendarEvent(ca,closingReportScheduleMap.get(ca.id));
                System.debug('calEvent_v2 -<>' + calEvent_v2);
            }
            else{
                calEvent_v2 = new CalendarEvent(ca);
            }
            candidateEventList.add(calEvent_v2);
        }
        
        candidateEventString = JSON.serialize(candidateEventList);
            System.debug('candidateEventString in main loop --> ' + candidateEventString);
            System.debug('candidateEventList dssssssssssssdsds--> ' + candidateEventList);

        while(candidateEventString.contains('endDateTime')) {
            candidateEventString = candidateEventString.replace('endDateTime', 'end'); 
            System.debug('candidateEventString in while loop --> ' + candidateEventString);
        }
        System.debug('candidateEventList ------------> ' + candidateEventList);
        System.debug('candidateEventString -------------> ' + candidateEventString);
        return candidateEventString;
    }

    //current selectedDate
    public static Date selectedDate            {get; set;}
    public static String getSelectedDateStr() {
        if(selectedDate != null) {
            return selectedDate.format();
        }
        return '';
    }

    //start of the week date
    public static Date selectedDateStartOfWeek {get; set;}
    public static String getSelectedDateStartOfWeekStr() {
        if(selectedDateStartOfWeek != null)
            return selectedDateStartOfWeek.format();
        return '';
    }
    
    //end of the week date
    public static Date selectedDateEndOfWeek   {get; set;}
    public static String getSelectedDateEndOfWeekStr() {
        if(selectedDateEndOfWeek != null)
            return selectedDateEndOfWeek.format();
        return '';
    }

    //for showing dialog box and passing data for it
    public static Boolean showCreateAvailRecord {
        get {
            if(showCreateAvailRecord == null)
                showCreateAvailRecord = false;
            return showCreateAvailRecord;
        }
        set;
    }

    @AuraEnabled
    public static List<Date> openCreateAvailRecordDialog() {
    // public static void openCreateAvailRecordDialog() {
            // resetCreateAvailData();
            
            // String dateStr = Utility.getPageParameter('dateStr');
            // selectedDate = Date.parse(dateStr);
            selectedDate = Date.today();
            
            selectedDateStartOfWeek = selectedDate.toStartOfWeek();
            selectedDateEndOfWeek = selectedDateStartOfWeek.addDays(6);
            showCreateAvailRecord = true;

            List<Date> newDate = new List<Date>();
            newDate.add(selectedDate);
            System.debug('selectedDate ----> ' + selectedDate);
            newDate.add(selectedDateStartOfWeek);
            System.debug('selectedDateStartOfWeek ----->' + selectedDateStartOfWeek);
            newDate.add(selectedDateEndOfWeek);
            System.debug('selectedDateEndOfWeek -----> ' + selectedDateEndOfWeek);
            // newDate.add(showCreateAvailRecord);
            System.debug('newDate ----->' + newDate);
            return newDate;

    }

    private static void resetCreateAvailData() {
        
        tempVacancy.TR1__Estimated_Start_Date__c = null;
        tempVacancy.TR1__Estimated_End_Date__c = null;
        tempVacancy.Start_Time__c='08:30 AM';
        tempVacancy.End_Time__c='03:30 PM';
        tempCandidateAvailability.Type__c='Available';
        
        selectedDate = null;
        selectedDateStartOfWeek = null;
        selectedDateEndOfWeek = null;
        
        isWeekSelected = false;
    } 

    //can delete event if there is event present else it will return null for that toast will be called or error message will be passed
    // @AuraEnabled
    // //? actually no need to return anything here because delete event will store in backend only
    // // public static Id deleteCalEvent() {
    // public static void deleteCalEvent(Id eventid) {
    //     if (eventid !=null) {
            
    //         delete [SELECT Id FROM Candidate_Availability__c WHERE Id=:eventid];
    //     }    else {
    //         System.debug('Event id is not passed');
    //     }
         
    // }

    @AuraEnabled
    //? actually no need to return anything here because delete event will store in backend only
    // public static Id deleteCalEvent() {
    public static void deleteCalEvent(Id eventid) {

        if (eventid !=null) {
            List<Candidate_Availability__c> availablity = RC_AccessController.getCandidateAvailabilityRecordsByEventId(eventId);
                    
            if(availablity != null && availablity.size() > 0) {
                RC_AccessController.deleteRecords(availablity);
                        
                eventId = null;
                fetchData();
                System.debug('Availability deleted successfully.');
                    }
        }    else {
            List<Closing_Report_Schedule__c> crsListToBeUpdated = new List<Closing_Report_Schedule__c>();
            for(Closing_Report_Schedule__c crs : RC_AccessController.getClosingReportScheduleRecordsByEventId(eventId)){
                crs.Status__c = 'Cancelled';
                crsListToBeUpdated.add(crs);
            }

            if(crsListToBeUpdated != null && crsListToBeUpdated.size() > 0) {
                RC_AccessController.updateRecords(crsListToBeUpdated);
                        
                eventId = null;
                fetchData();
                System.debug('Assignment cancelled successfully.');
            }

        }
         
    }

    public static DateTime formatDateTimefromDate(Date dateVar,String startTime){
        
        String startDateTime = dateVar.format();
        
        String startTimeHour = startTime.split(':')[0];
        String startTimeMinute = startTime.split(':')[1].remove(' AM').remove(' PM');
        
        if (startTime.contains(' AM') && startTimeHour=='12') {
            startTimeHour = '00';
        }
        
        Datetime returnDt = Datetime.newInstance(
            dateVar.year(),
            dateVar.month(),
            dateVar.day(),
            Integer.valueOf(startTimeHour),
            Integer.valueOf(startTimeMinute),
            00
        );
        
        if (startTime.contains(' PM') && startTimeHour !='12') {
            
            returnDt = returnDt.addHours(12);
        }
        
        return returnDt;        
    }

    public timeslotWrapper tsw;//This will be used to take time and day input while creation of Candidate Availability from Popup
    
    //timeslot wrraper to manipulate date and time
    public class timeslotWrapper {
        
        public Boolean isMon        { get; set; }
        public Boolean isTue        { get; set; }
        public Boolean isWed        { get; set; }
        public Boolean isThu        { get; set; }
        public Boolean isFri        { get; set; }
        public Boolean isSat        { get; set; }
        public Boolean isSun        { get; set; }
        
        public timeslotWrapper() {
            isMon = true;
            isTue = true;
            isWed = true;
            isThu = true;
            isFri = true;
            isSat = false;
            isSun = false;
        }
    }

    //when user clicks on clear button this method is called which unchecks all the boxes
    public PageReference resetDaySelection(){
        tsw.isMon = false;
        tsw.isTue = false;
        tsw.isWed = false;
        tsw.isThu = false;
        tsw.isFri = false;
        tsw.isSat = false;
        tsw.isSun = false;
        return null;
    }

    // public TR1__Job__c tempVacancy = new TR1__Job__c();               //to find that is there a vacancy for the job
    
    //to save the record when pressed on the save button by the user
    // public void saveCreateAvailRecord() {
        @AuraEnabled
        public static Id saveCreateAvailRecord(String wrapperdata) {
                String contactId;
                if (String.isBlank(wrapperdata)) {
                    return null;
                }

                Map<String,Object> eventMap = (Map<String, Object>) JSON.deserializeUntyped(wrapperdata);
                System.debug('eventMap ---> ' + eventMap);

                // Event newEvent = new Event();
                Candidate_Availability__c newCavail = new Candidate_Availability__c();
                System.debug('candidate availability' + newCavail);
                System.debug('candidate availability type ' + newCavail.Type__c);
                // newEvent.Subject = eventMap.get('title') != null ? (String)eventMap.get('title') : null;
                // System.debug('newEvent.Subject -------> '+newEvent.Subject);
                newCavail.Type__c = eventMap.get('TypeValue') !=null ? (String)eventMap.get('TypeValue') :null;
                System.debug('newCavail.Type__c ---> '+newCavail.Type__c);


                String startDate = eventMap.get('startDate') != null ? 
                                    ((String)eventMap.get('startDate')).replace('T', ' '): 
                                    null;
                                    
                System.debug('startDate ---> '+startDate);

                // Date sDateonly = Date.today();
                // Date eDateOnly = Date.today() + 1;

                String EndDate = eventMap.get('EndDate') != null ? 
                                    ((String)eventMap.get('EndDate')).replace('T', ' '): 
                                    null;
                System.debug('EndDate ----> ' + EndDate);
                
                // newCavail.Start_Date_Time__c = startDate!=null ?  Datetime.valueOfGmt(startDate) : null;
                newCavail.Start_Date_Time__c = startDate!=null ?  Datetime.valueOfGmt(startDate) : null;
                newCavail.End_Date_Time__c = EndDate != null ? Datetime.valueOfGmt(EndDate) : null;
                

                //todo uncomment the below logic for date conversion
                Datetime value = newCavail.Start_Date_Time__c;
                Datetime valueE = newCavail.End_Date_Time__c;
                TimeZone to = TimeZone.getTimeZone('United Kingdom');
                value = value.addSeconds(to.getOffset(value) - 19800);
                valueE = valueE.addSeconds(to.getOffset(value) - 19800);
                System.debug('value of timezone is ------> ' + value);
                System.debug('value of timezone is ------> ' + valueE);

                // newCavail.Start_Date_Time__c = value;
                // newCavail.End_Date_Time__c = valueE;
                
                Date sDateonly = Date.valueOf((newCavail.Start_Date_Time__c).date());       //? only for the start date value
                Date eDateOnly = Date.valueOf((newCavail.end_Date_Time__c).date());         //? only for the end date value

                id conId = [SELECT id,contactid from user where id=:userinfo.getuserId()].contactid;
                if(conId!=null)
                    newCavail.Candidate__c	= conId;
                System.debug('conId>>'+conId);
                
                // newCavail.Candidate__c	= '0030C00000SPlMiQAL';


                // newCavail.Candidate__c	= RC_AccessController.getContactRecordById(contactId).Id;
                newCavail.Start_Date__c = sDateonly;
                newCavail.End_Date__c = eDateOnly;
                System.debug('newCavail all front  -----> ' + newCavail);

                insert newCavail;

                return newCavail.Id;
        
        
    }

    public class wrapperclass{
        @AuraEnabled public String type;
        @AuraEnabled public Date startDate;
        @AuraEnabled public Date EndDate;

    }

}