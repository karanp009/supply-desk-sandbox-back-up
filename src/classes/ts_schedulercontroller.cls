/*
 * Author :  Naimish Kalena
 * Created on Thu Jun 30 2022
 * Company :  2022 MV Clouds Private Limited
 * Description : 
 */


public with sharing class ts_schedulercontroller {

     @AuraEnabled(cacheable = true)
     public static List<MainWrapper> getAvailbilityData(){
         List<MainWrapper> mainwrapList = new List<MainWrapper>();              //Main wrapper list everything passes down to this  , and it passes down to lwc
         Contact contact = new Contact();
         String contactId;
         TR1__Job__c tempVacancy = new TR1__Job__c();               //to find that is there a vacancy for the job
         Candidate_Availability__c tempCandidateAvailability = new Candidate_Availability__c();             // to create availability for the candidate
 		 Boolean isInternalUser;                // to check if the user is portal user
        //  String candidateEventString; // This will be JSON which will be pased on Page to show Candidate Availability in Calendar
         String cId = [SELECT Id FROM Contact WHERE ID = '0030C00000SPlMiQAL'].ID;          //!to pass the contact Id of the logged in user need to change it later
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

    @AuraEnabled
    public static String createAvailMap() {

        String candidateEventString; // This will be JSON which will be pased on Page to show Candidate Availability in Calendar
        List<CalendarEvent> candidateEventList = new List<CalendarEvent>();
        String contactId;
        
        candidateEventList.clear();
        candidateEventString='';
        
        Map<Id,Candidate_Availability__c> candidateAvailabilityMap = new Map<Id,Candidate_Availability__c>(RC_AccessController.getCandidateAvailabilityByContactId(contactId));
        Map<Id,Closing_Report_Schedule__c> closingReportScheduleMap = new Map<Id,Closing_Report_Schedule__c>();
        for(Closing_Report_Schedule__c crs : RC_AccessController.getClosingReportScheduleByCandidateAvailability(candidateAvailabilityMap)){
            closingReportScheduleMap.put(crs.Candidate_Availability__c,crs);
        }
            
        for(Candidate_Availability__c ca : candidateAvailabilityMap.values()){
            CalendarEvent calEvent_v2;
            if(closingReportScheduleMap.containsKey(ca.id)){
                calEvent_v2 = new CalendarEvent(ca,closingReportScheduleMap.get(ca.id));
            }
            else{
                calEvent_v2 = new CalendarEvent(ca);
            }
            candidateEventList.add(calEvent_v2);
        }
        
        candidateEventString = JSON.serialize(candidateEventList);
        while(candidateEventString.contains('endDateTime')) {
            candidateEventString = candidateEventString.replace('endDateTime', 'end'); 
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
            resetCreateAvailData();
            
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
    //? actually no need to return anything here because delete event will store in backend only
    // public static Id deleteCalEvent() {
    public void deleteCalEvent() {
        showCreateAvailRecord  = false;
        String eventId;

            if(String.isNotBlank(eventId)) {
                if(eventId.startsWith('a1a')){
                    List<Candidate_Availability__c> availablity = RC_AccessController.getCandidateAvailabilityRecordsByEventId(eventId);
                    
                    if(availablity != null && availablity.size() > 0) {
                        RC_AccessController.deleteRecords(availablity);
                        System.debug(eventId);
                        eventId = null;
                        createAvailMap();
                        //TODO need to call toast for Availability deleted successfully from lwc
                        // Utility.AddConfirmMessage('Availability deleted successfully.'+showCreateAvailRecord);
                        System.debug(eventId);
                        // return eventId;
                    }
                    
                }
                else{
                    List<Closing_Report_Schedule__c> crsListToBeUpdated = new List<Closing_Report_Schedule__c>();
                    for(Closing_Report_Schedule__c crs : RC_AccessController.getClosingReportScheduleRecordsByEventId(eventId)){
                        crs.Status__c = 'Cancelled';
                        crsListToBeUpdated.add(crs);
                    }
                    
                    if(crsListToBeUpdated != null && crsListToBeUpdated.size() > 0) {
                        RC_AccessController.updateRecords(crsListToBeUpdated);
                        System.debug(eventId);
                        eventId = null;
                        createAvailMap();
                        //TODO need to call toast for Assignment cancelled successfully lwc
                        // Utility.AddConfirmMessage('Assignment cancelled successfully.');
                        System.debug(eventId);
                        // return eventId;
                    }
                    
                }
                
            }
            else {
                showCreateAvailRecord = false;
                System.debug('No records found to delete');
            }
            // return eventId;
         
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
    public void saveCreateAvailRecord() {
        String contactId;

        Date baseDate = DATE.newInstance(2000, 1, 1);
    
        timeslotWrapper tsw;//This will be used to take time and day input while creation of Candidate Availability from Popup

        Savepoint sp = Database.setSavepoint();
        try {
            system.debug('tempVacancy.Start_Time__c--'+tempVacancy.Start_Time__c+'tempVacancy.End_Time__c---'+tempVacancy.End_Time__c);
            if(String.isBlank(tempCandidateAvailability.Type__c)){
                // Utility.AddErrorMessage('Please populate Type of Availability.');
                // System.debug('need to display an error message through')
                System.debug('Please populate Type of Availability.');
                //todo display error message from lwc toast
                return;
            }
            if(String.isBlank(tempVacancy.Start_Time__c)){
                // Utility.AddErrorMessage('Pleajse populate Start Time.');
                System.debug('Please populate Start Time.');
                //todo display error message from lwc toast

                return;
            }
            if(String.isBlank(tempVacancy.End_Time__c)){
                // Utility.AddErrorMessage('Please populate End Time.');
                System.debug('Please populate End Time.');
                //todo display error message from lwc toast

                return;
            }
            if(tempVacancy.Start_Time__c == tempVacancy.End_Time__c){
                // Utility.AddErrorMessage('Start Time & End Time cannot be same.');
                System.debug('Start Time & End Time cannot be same.');
                //todo display error message from lwc toast

                return;
            }
             if(selectedDate!=null && (formatDateTimefromDate(selectedDate,tempVacancy.Start_Time__c) > formatDateTimefromDate(selectedDate,tempVacancy.End_Time__c))){
                // Utility.AddErrorMessage('Start Time should be less than  End Time.');
                System.debug('Start Time should be less than  End Time.');
                //todo display error message from lwc toast

                return;
            }
            if(tempVacancy.TR1__Estimated_Start_Date__c!=null && (formatDateTimefromDate(tempVacancy.TR1__Estimated_Start_Date__c,tempVacancy.Start_Time__c) > formatDateTimefromDate(tempVacancy.TR1__Estimated_Start_Date__c,tempVacancy.End_Time__c))){
                // Utility.AddErrorMessage('Start Time should be less than  End Time.');
                System.debug('Start Time should be less than  End Time.');
                //todo display error message from lwc toast

                return;
            }
            if(tempVacancy.TR1__Estimated_Start_Date__c!=null && tempVacancy.TR1__Estimated_Start_Date__c <date.Today()){
                // Utility.AddErrorMessage('Please select start date Today or greater than Today.');
                System.debug('Please select start date Today or greater than Today.');
                //todo display error message from lwc toast

                return;
            }
            List<Candidate_Availability__c> candidateAvailablityToAdd = new List<Candidate_Availability__c>();
            
            Set<String> daySet = new Set<String>();
            if(tsw.isMon){daySet.add('Monday');}
            if(tsw.isTue){daySet.add('Tuesday');}
            if(tsw.isWed){daySet.add('Wednesday');}
            if(tsw.isThu){daySet.add('Thursday');}
            if(tsw.isFri){daySet.add('Friday');}
            if(tsw.isSat){daySet.add('Saturday');}
            if(tsw.isSun){daySet.add('Sunday');}
            
            if(!isWeekSelected) {
                candidateAvailablityToAdd.add(
                    new Candidate_Availability__c(
                        Start_Date__c = selectedDate,
                        Start_Date_Time__c = formatDateTimefromDate(selectedDate,tempVacancy.Start_Time__c),
                        Candidate__c = contactId, 
                        End_Date__c = selectedDate,
                        End_Date_Time__c = formatDateTimefromDate(selectedDate,tempVacancy.End_Time__c),
                        Type__c = tempCandidateAvailability.Type__c

                    )
                );
            }
            else {
                Date startDate = tempVacancy.TR1__Estimated_Start_Date__c;
                Date EndDate = tempVacancy.TR1__Estimated_End_Date__c;
                Integer actualNoOfDays = StartDate.daysBetween(EndDate);
                for(Integer i = 0; i <= actualNoOfDays; i++){    
                    Date iterableDate = StartDate + i;
                    DateTime DateValue = iterableDate;
                    String selectedDay = DateValue.format('EEEE'); 
                    Integer noOfDays = baseDate.daysBetween(selectedDate);
                    Integer reminder = math.mod(noOfDays,7);
                    if(daySet.contains(selectedDay)){
                        candidateAvailablityToAdd.add(
                            new Candidate_Availability__c(
                                Start_Date__c = iterableDate,
                                Start_Date_Time__c = formatDateTimefromDate(iterableDate,tempVacancy.Start_Time__c),
                                Candidate__c = contactId,
                                End_Date__c = iterableDate,
                                End_Date_Time__c = formatDateTimefromDate(iterableDate,tempVacancy.End_Time__c),
                                Type__c = tempCandidateAvailability.Type__c
                            )
                        );
                    }
                }
            }
            if(candidateAvailablityToAdd.size() > 0){
                try{
                    RC_AccessController.insertRecords(candidateAvailablityToAdd);
                    // Utility.AddConfirmMessage('Availability created successfully.');
                    System.debug('vailability created successfully.');
                    //todo add toast to display the message of vailability created successfully.
                }
                catch(Exception e){
                    System.debug('Following exception occuew'+e.getMessage()+'Line number '+e.getlinenumber());
                }
            }
            createAvailMap();
            showCreateAvailRecord = false;
        }
        catch(Exception e) {
            Database.rollback(sp);  
        }
    }

}