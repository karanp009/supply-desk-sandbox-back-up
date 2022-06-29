@isTest
public class SendConfirmationLetterTest {
             @TestSetup
static void initData()
{
   User u1=TestUtility.getUserDetail();
}
  
    
    @isTest
    public static void method(){
        User u1=[Select Id,Name,Email from User where email='pb@ff1.com' Limit 1];
       System.runAs(u1){
           
           
        
        Account testAccount = new Account(Name = 'Test Account');
        insert testAccount;
        
        Contact testCandidate = new Contact(LastName='CVP Contact',Subject__c='Art',Email='test@test.com',AccountId = testAccount.Id,Compliance_Status__c = 'Clearance Pending',Compliance_Owner__c=u1.Id,Payroll_Number__c='343434',Trained_As__c='Cover Supervisor',Sector__c='College (6th)',Job_Titles__c='1-2-1 Tutor (Primary)',Assignment_Type__c='Day to Day');
        //Contact testCandidate = new Contact(LastName = 'Test Candidate',Email='test@test.com');
        insert testCandidate; 
        
        Contact testHiringManager = new Contact(LastName='Test The Hiring Manager',Subject__c='Art',Email='test@test.com',AccountId = testAccount.Id,Compliance_Status__c = 'Clearance Pending',Compliance_Owner__c=u1.Id,Payroll_Number__c='343434',Trained_As__c='Cover Supervisor',Sector__c='College (6th)',Job_Titles__c='1-2-1 Tutor (Primary)',Assignment_Type__c='Day to Day');
        //Contact testHiringManager = new Contact(LastName = 'Test Hiring Manager' ,  Email = 'abc@testHiringManager12345.com');
        insert testHiringManager;
           Contact candidate1 = new Contact(LastName = 'Candidate 1'); 
            Contact[] candidatelist = new Contact[]{candidate1};  
            insert candidatelist;
                          
        Id consultingid = Schema.SObjectType.TR1__Job__c.getRecordTypeInfosByName().get('Consulting').getRecordTypeId();
         Date todayDate = system.today();

        TR1__Job__c testJob = new TR1__Job__c(TR1__Account__c = testAccount.id, TR1__Hiring_Manager__c = testHiringManager.Id,Subject2__c='Accountancy',Year_Key_Stage__c='KS2',TR1__Contact__c=testCandidate.Id);
        insert testJob;
           Id crconsultingId = Schema.SObjectType.TR1__Closing_Report__c.getRecordTypeInfosByName().get('Consulting').getRecordTypeId();
            TR1__Closing_Report__c testClosingReport = new TR1__Closing_Report__c(TR1__Account__c = testAccount.id,RecordTypeId = crconsultingId, TR1__Job__c = testJob.Id, TR1__Person_Placed__c = testCandidate.Id, TR1__Salary__c = 125000.00, TR1__Job_Percentage__c = 20,
            TR1__Candidate_Percentage__c = 20, TR1__Marketing_Percentage__c = 20, TR1__Other_Percentage__c = 20, TR1__Other2_Percentage__c = 20,Hiring_Manager__C=testCandidate.ID,
            TR1__Job_Credit__c = u1.Id, TR1__Candidate_Credit__c = u1.Id, TR1__Marketing_Credit__c = u1.Id, TR1__Other_Credit__c = u1.Id, TR1__Other2_Credit__c = u1.Id,Timesheet_Frequency__c = 'Weekly',
            TR1__Start_Date__c = todayDate.addDays(-15), TR1__End_Date__c = todayDate.addDays(10), TR1__Generate_Timesheet__c = true, TR1__Timesheet_Approver__c = candidatelist[0].Id); 
            insert testClosingReport;
       
           
           
                   
        testClosingReport.Booking_Confirmed__c = true;
        Update testClosingReport;
    }
    }
    
}