public without sharing class ts_TimesheetPrintPdfController {


    public String[] timesheetIds                           {get;set;}
    public transient List<TR1__Timesheet__c> timesheetList                      {get;set;}
    public transient List<TimesheetPrintWrapper> TimesheetPrintWrapperList          {get;set;}
    public integer LastPdf {get;set;}
    public Boolean isClient {get;set;}
    public User loggedInUser ;
    public Contact objContactPage {get;set; }

    public integer getPageCount(){
        return TimesheetPrintWrapperList.size();
    }

    public ts_TimesheetPrintPdfController() {

        TimesheetPrintWrapperList = new List<TimesheetPrintWrapper> ();
        // system.debug('TimesheetList: '+System.currentPageReference().getParameters().get('timesheetIds'));
        // String[] timesheetIds = ((String)System.currentPageReference().getParameters().get('timesheetIds')).split(';');
        loggedInUser = [Select ContactId from User where Id =: '0050C000005eNFbQAM' limit 1];
        if(!test.isrunningtest()){
            objContactPage = [Select Community_Contact_Type__c,Name from Contact where Id =:loggedInUser.ContactId limit 1];


            if(objContactPage.Community_Contact_Type__c == 'Candidate' || objContactPage.Community_Contact_Type__c == 'C And C'  ){
                isClient = false;
            }else if(objContactPage.Community_Contact_Type__c == 'Client'){
                isClient = true;
            }
        }

        // timesheetList = RC_AccessController.getTimesheetsByIds(timesheetIds);
        String strQueryTS = 'SELECT Id, Name, TR1__Week_Ending__c, Timesheet_Week__c, TR1__Status__c,TR1__Consultant_Name__c , TR1__Job_Order__r.TR1__Job_Title__c, Pay_Rate_1__c, TR1__Total_Hours__c, Pay_Rate_2__c, TR1__Client_Name__c, TR1__Approver__r.name, ';
        strQueryTS += 'Charge_Rate_1__c, Charge_Rate_2__c, Charge_Rate_3__c, ';
        strQueryTS += 'TR1__Total_Regular_Hours__c, Total_Days__c, Total_Half_Days__c, ';
        strQueryTS += 'Teacher_Rating__c, Request_Quality_Call__c, TR1__Approvers_Notes__c, ';
        strQueryTS += 'All_Approver__c, TR1__Consultant__c, ';
        strQueryTS += '(Select TR1__Date__c, TR1__Day__c, TR1__Double_Time_Hours__c, Id,DayShift__c,Half_Day__c, TR1__Overtime_Hours__c, TR1__Regular_Hours__c, TR1__Sick_Time_Hours__c,TR1__Timesheet__c, TR1__Vacation_Hours__c, TR1__Expenses__c, Start_Time__c,End_Time__c From TR1__Timecards__r order by TR1__date__c asc)  ';
        strQueryTS += ' from TR1__Timesheet__c where Id = \'a0y0C000006iUzMQAU\'';

        String whereClauseTSD = ' AND (All_Approver__c like \'%'+ ((String)objContactPage.Id).left(15) +'%\' OR TR1__Consultant__c = \'' + loggedInUser.ContactId + '\') ';
        
        timesheetList = Database.query(strQueryTS+whereClauseTSD);
        
        calculatehours();
    }

    public void calculatehours(){
        integer lstCount = 0;
        for(TR1__Timesheet__c timesheet : timesheetList) {
            TimesheetPrintWrapper wrapper = new TimesheetPrintWrapper(timesheet , ++lstCount)  ;
            for(TR1__Timesheet_Detail__c td : timesheet.TR1__Timecards__r){
                if(td.TR1__Double_Time_Hours__c != null)
                    wrapper.totalHours = wrapper.totalHours + td.TR1__Double_Time_Hours__c;
                if(td.TR1__Expenses__c != null)
                    wrapper.totalHours = wrapper.totalHours + td.TR1__Expenses__c;
                if(td.TR1__Overtime_Hours__c != null)
                    wrapper.totalHours = wrapper.totalHours + td.TR1__Overtime_Hours__c;
                if(td.TR1__Regular_Hours__c != null)
                    wrapper.totalHours = wrapper.totalHours + td.TR1__Regular_Hours__c;
                if(td.TR1__Sick_Time_Hours__c != null)
                    wrapper.totalHours = wrapper.totalHours + td.TR1__Sick_Time_Hours__c;
                if(td.TR1__Vacation_Hours__c != null)
                    wrapper.totalHours = wrapper.totalHours + td.TR1__Vacation_Hours__c;
            }
            TimesheetPrintWrapperList.add(wrapper);
        }
        LastPdf = TimesheetPrintWrapperList.size();
    }

    public class TimesheetPrintWrapper {

        public Double totalHours               {get;set;}
        public integer index                 {get;set;}
        public TR1__Timesheet__c timesheet      {get;set;}

        public TimesheetPrintWrapper(TR1__Timesheet__c timesheet,integer index) {
            this.timesheet =  timesheet;
            totalHours = 0;
            this.index = index;

        }
    }
}