// ****************************************************************************************************************************
// Class Name       : ts_TimesheetController
// Author           : Nitin, Mihir Ramoliya
// Created Date     : 29/06/2022
// Description      : This Class Used In ts_Timesheet (LWC component ) and  ts_TimesheetDetails (LWC component)
// TestClass        :
// Code Coverage    :
// ****************************************************************************************************************************

public without sharing class ts_TimesheetController {
        
    @AuraEnabled
    public static List<TR1__Timesheet__c> getTimesheet(String timesheetStatus) {
        User loggedInUser = [Select ContactId from User where Id =: UserInfo.getUserId()];
        
        // Id userId = '0050C000005eNFbQAM';  // Nitin client Id for getting data 
        // User loggedInUser = [Select ContactId from User where Id =: userId];

        List<Schema.FieldSetMember> lstFieldsTimesheetDetail = new List<Schema.FieldSetMember>();
        List<TR1__Timesheet__c> lstTimesheet = new List<TR1__Timesheet__c>();

        List<TR1__Timesheet__c> lstTsCandidate = new List<TR1__Timesheet__c>();
        List<TR1__Timesheet__c> lstTsClient = new List<TR1__Timesheet__c>();
        
        try {
            Contact objContactPage = [Select Community_Contact_Type__c, Holiday_Accrued__c,Name from Contact where Id =:loggedInUser.ContactId];
            
            String strQuery = 'SELECT Id';
            lstFieldsTimesheetDetail = SObjectType.TR1__Timesheet__c.FieldSets.RC_TimesheetList.getFields();

            for(Schema.FieldSetMember objFSM: lstFieldsTimesheetDetail) {
                strQuery += ', ' + objFSM.getFieldPath() ;
            }

            if(!strQuery.contains('All_Approver__c')) {
                strQuery += ',All_Approver__c ';
            }
            if(!strQuery.contains('TR1__Consultant__c')) {
                strQuery += ',TR1__Consultant__c ';
            }

            strQuery += ' FROM TR1__Timesheet__c Where  ';

            String whereClause = objContactPage.Community_Contact_Type__c == 'C and C' ?  'All_Approver__c like \'%'+ ((String)loggedInUser.ContactId).left(15) +'%\' OR  TR1__Consultant__c =\''+ loggedInUser.ContactId+'\'' :
                               (objContactPage.Community_Contact_Type__c == 'Client' ? 'All_Approver__c like \'%'+ ((String)loggedInUser.ContactId).left(15) +'%\'AND TR1__Status__c NOT In (\'Unsubmitted\',\'Not Submitted\')'  : 
                               (objContactPage.Community_Contact_Type__c == 'Candidate' ? 'TR1__Consultant__c =\''+ loggedInUser.ContactId+'\'' : ' ') ) ;

            whereClause += 'AND TR1__Status__c = ' + timesheetStatus + ' ';

            System.debug('whereClause is ==>' + whereClause);
            System.debug('Query is ==>' + strQuery + whereClause + ' ORDER By CreatedDate DESC');



            if(String.isNotBlank(whereClause)) {  
                lstTimesheet = Database.query(strQuery + whereClause + ' ORDER By CreatedDate DESC');
                // lstTimesheet = RC_AccessController.query(strQuery + whereClause + ' ORDER By CreatedDate DESC');  
                for(TR1__Timesheet__c objTS : lstTimesheet) {
                    if(objTS.All_Approver__c.contains(((String)loggedInUser.ContactId).left(15))) {
                        lstTsClient.add(objTS);
                    } else if(objTS.TR1__Consultant__c == (((String)loggedInUser.ContactId).left(15))){
                        lstTsCandidate.add(objTS);
                    }
                }
            }



        } catch (Exception e) {
            System.debug(e);
            System.debug('Line Number ==>'+ e.getLineNumber());
            System.debug('Message ===>'+ e.getMessage() + ' <==>'+ e.getStackTraceString());
        }
        return lstTsClient;
    }

    @AuraEnabled
    public static String approveRejectTimeSheet(String timesheetId, String operation, String notes, String ratingValue, Boolean rqc) {
        String message;
        try {
            TR1__Timesheet__c timesheetForUpdate = [SELECT Id, Name, TR1__Status__c FROM TR1__Timesheet__c WHERE Id =: timesheetId];
            if (operation == 'Approve') {
                timesheetForUpdate.TR1__Status__c = 'Approved';
                if (notes != null || notes !='') {
                    timesheetForUpdate.TR1__Approvers_Notes__c = notes;
                }
                if (ratingValue != null || ratingValue != '') {
                    timesheetForUpdate.Teacher_Rating__c = ratingValue;
                }
                if (rqc != null) {
                    timesheetForUpdate.Request_Quality_Call__c = rqc;
                }
                message = 'Approved';
            } else if(operation == 'Reject') {
                timesheetForUpdate.TR1__Status__c = 'Rejected';
                if (notes != null || notes !='') {
                    timesheetForUpdate.TR1__Approvers_Notes__c = notes;
                }
                message = 'Rejected';
            }
            update timesheetForUpdate;
        } catch (Exception e) {
            System.debug(e);
            System.debug('Line Number ==>'+ e.getLineNumber());
            System.debug('Message ===>'+ e.getMessage() + ' <==>'+ e.getStackTraceString());
            message = 'error';
        } return message;
    }

    @AuraEnabled
    public static String sendMessageToJobOwner(String timesheetId, String message) {
        String returnmessage;
        try {
            TR1__Timesheet__c timesheetForUpdate = [SELECT Id, Name, TR1__Status__c, Message_to_Job_Owner__c FROM TR1__Timesheet__c WHERE Id =: timesheetId];
            
            if (message != null || message !='') {
                timesheetForUpdate.Message_to_Job_Owner__c = message;
                returnmessage = 'sent';
            }

            update timesheetForUpdate;
        } catch (Exception e) {
            System.debug(e);
            System.debug('Line Number ==>'+ e.getLineNumber());
            System.debug('Message ===>'+ e.getMessage() + ' <==>'+ e.getStackTraceString());
            returnmessage = 'error';
        } return returnmessage;
    }

    @AuraEnabled
    public static timesheetDetail getTimesheetDetails(String timesheetId) {
        
        timesheetDetail timesheetDetailWrapper = new timesheetDetail();
        // String timesheetId = 'a0y0C000006iUzGQAU';
        // timesheetId = 'a0y0C000006iUzGQAU';
        timesheetId = 'a0y0C000006iUzMQAU';
        Id userId = '0050C000005eNFbQAM';  // Nitin client Id for getting data 
        
        List<Schema.FieldSetMember> lstFieldSet;
        String strContactId = [Select ContactId from User where Id =: userId].ContactId;
        // Contact objContact;
        Contact objContact = [SELECT Id, Name, Community_Contact_Type__c, Email FROM Contact WHERE id =: strContactId];
        Boolean isClient;

        try {
            // String strQueryTSD = 'Select TR1__Date__c, TR1__Day__c ';

            String strQueryTS = 'SELECT Id, Name, TR1__Week_Ending__c, Timesheet_Week__c, TR1__Status__c,TR1__Consultant_Name__c , TR1__Job_Order__r.TR1__Job_Title__c, ';
            strQueryTS += 'Charge_Rate_1__c, Charge_Rate_2__c, Charge_Rate_3__c, ';
            strQueryTS += 'TR1__Total_Regular_Hours__c, Total_Days__c, Total_Half_Days__c, ';
            strQueryTS += 'Teacher_Rating__c, Request_Quality_Call__c, TR1__Approvers_Notes__c, ';
            strQueryTS += 'All_Approver__c, TR1__Consultant__c ';
            strQueryTS += ' from TR1__Timesheet__c where Id = \'' + timesheetId  + '\'';

            String whereClauseTSD = ' AND (All_Approver__c like \'%'+ ((String)objContact.Id).left(15) +'%\' OR TR1__Consultant__c = \'' + strContactId + '\') ';
            
            TR1__Timesheet__c ts = Database.query(strQueryTS+whereClauseTSD);

            
            String strQueryTSD = 'SELECT TR1__Date__c, TR1__Day__c, TR1__Regular_Hours__c, DayShift__c, Half_Day__c ';
            strQueryTSD += ' from TR1__Timesheet_Detail__c where TR1__Timesheet__c = \'' + timesheetId  + '\'';
            strQueryTSD += ' ORDER BY TR1__Date__c ASC';

            List<TR1__Timesheet_Detail__c> lstTimesheetDetailRecords = Database.query(strQueryTSD);

            if( (objContact.Community_Contact_Type__c == 'Candidate' || objContact.Community_Contact_Type__c == 'C and C') && strContactId == ts.TR1__Consultant__c) {
                isClient = false;
            }
            else if( (objContact.Community_Contact_Type__c == 'Client' || objContact.Community_Contact_Type__c == 'C and C') && ts.All_Approver__c.contains(((String)objContact.Id).left(15))) {
                isClient = true;
            }

            timesheetDetailWrapper.timesheet = ts;         
            timesheetDetailWrapper.timesheetDetailsList = lstTimesheetDetailRecords;         
            timesheetDetailWrapper.isClient = isClient;         

        } catch (Exception e) {
            System.debug(e);
            System.debug('Line Number ==>'+ e.getLineNumber());
            System.debug('Message ===>'+ e.getMessage() + ' <==>'+ e.getStackTraceString());
        }
        return timesheetDetailWrapper;
    }

    // Download pdf in mobile and tablet view Created by Mihir Ramoliya
    @AuraEnabled
    public static string downloadPdf(String recordid){
        try {
            String pdf_url = '/apex/ts_TimesheetPrintPdf?id='+recordid;
    
            PageReference pdfPage = new PageReference(pdf_url);
            Blob pdfBlob = pdfPage.getContent();
            String base64Pdf = EncodingUtil.base64Encode(pdfBlob);
            System.debug(base64Pdf);
            return base64Pdf;
            
        } catch (Exception e) {
            System.debug(e);
            GenericException Exp = ExceptionHandler.logException(e, 'ts_TimesheetController', 'downloadPdf');
            return null;
        }
    }

    // @AuraEnabled
    // public static String getUserDetails() {
    //     String returnmessage;
    //     try {
    //         User loggedInUser = [SELECT Id, ContactId, FullPhotoUrl FROM User WHERE Id =: UserInfo.getUserId()];
    //         Contact objContactPage = [SELECT Id, Name, Community_Contact_Type__c, Holiday_Accrued__c FROM Contact WHERE Id =:loggedInUser.ContactId];

            
    //     } catch (Exception e) {
    //         System.debug(e);
    //         System.debug('Line Number ==>'+ e.getLineNumber());
    //         System.debug('Message ===>'+ e.getMessage() + ' <==>'+ e.getStackTraceString());
    //         returnmessage = 'error';
    //     } return returnmessage;
    // }

    public class timesheetDetail{
        @AuraEnabled public List<TR1__Timesheet_Detail__c> timesheetDetailsList;
        @AuraEnabled public TR1__Timesheet__c timesheet;
        @AuraEnabled public Boolean isClient;
    }

}