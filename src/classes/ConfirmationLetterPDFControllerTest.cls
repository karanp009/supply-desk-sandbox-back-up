@isTest
public class ConfirmationLetterPDFControllerTest {
    
    @istest
    public static void main(){
        
        User u1=TestUtility.getUserDetail();
          
        
        System.runAs(u1){
            Account acc=TestUtility.getAccountDetail();
        Contact con =TestUtility.getContactDetailWithoutRT(u1,acc);
            insert con;
        
        TR1__Qualification__c objQual = new TR1__Qualification__c(Name = 'DBS', TR1__Field_Set_ID__c = '321534');
        insert objQual;
        
        TR1__Qualification__c objQual1 = new TR1__Qualification__c(Name = 'Barred List', TR1__Field_Set_ID__c = '321535');
        insert objQual1;
        
        TR1__Qualification__c objQual2 = new TR1__Qualification__c(Name = 'Overseas Police Check', TR1__Field_Set_ID__c = '321536');
        insert objQual2;
        
        TR1__Qualification_Package__c objQualPkg  = new TR1__Qualification_Package__c(TR1__Name__c = 'PAYE');
        insert objQualPkg;
        
        TR1__Associated_Qualification__c objAssoQual = new TR1__Associated_Qualification__c(TR1__Qualification__c =objQual.Id, TR1__Contact__c = con.Id, TR1__Qualification_Package__c = objQualPkg.Id,Group_1_ID_Type__c='Passport');         
        insert objAssoQual;
        
        TR1__Associated_Qualification__c objAssoQual1 = new TR1__Associated_Qualification__c(TR1__Qualification__c =objQual1.Id, TR1__Contact__c = con.Id, TR1__Qualification_Package__c = objQualPkg.Id,Barred_List_Date_Checked__c = date.today());         
        insert objAssoQual1;
        
        TR1__Associated_Qualification__c objAssoQual2 = new TR1__Associated_Qualification__c(TR1__Qualification__c =objQual2.Id, TR1__Contact__c = con.Id, TR1__Qualification_Package__c = objQualPkg.Id,Overseas_Police_Check__c='Yes');         
        insert objAssoQual2;
        
        Id consultingid = Schema.SObjectType.TR1__Job__c.getRecordTypeInfosByName().get('Consulting').getRecordTypeId();
        
        TR1__Job__c job = new TR1__Job__c(TR1__Account__c = acc.id,
                                          TR1__Status__c = 'Open',
                                          TR1__Client_Description__c ='test',
                                          TR1__Education_Requirements__c='aaa',
                                          TR1__Experience_Requirements__c='bbb',
                                          TR1__Responsibilities__c='ccc',
                                          TR1__State_Area__c='test', 
                                          TR1__Regional_Area__c='test',
                                          Booking_Type__c='test',
                                          TR1__Division__c='test',
                                          TR1__Primary_Background__c='test',
                                          TR1__Estimated_Start_Date__c = System.today().addDays(-30),
                                          TR1__Estimated_End_Date__c = System.today().addDays(90), 
                                          RecordTypeId = consultingid,
                                          Friday_s_Shift__c = 'Full Day',
                                          Monday_s_Shift__c = 'Full Day',
                                          Saturday_s_Shift__c = 'Full Day',
                                          Sunday_s_Shift__c = 'Full Day',
                                          Thursday_s_Shift__c = 'Full Day',
                                          Tuesday_s_Shift__c = 'Full Day',
                                          Subject2__c='Accountancy',
                                          Year_Key_Stage__c='KS2',
                                          Wednesday_s_Shift__c = 'Full Day');
        insert job;
        
        TR1__Closing_Report__c cr = new TR1__Closing_Report__c(TR1__Account__c = acc.id ,TR1__Job__c = job.id , TR1__Person_Placed__c = con.id , RecordTypeId = Utility.CONSULTING_RTID ,TR1__Start_Date__c = System.today() , TR1__End_Date__c = System.today().addDays(6),TR1__Candidate_Percentage__c=100,TR1__Job_Credit__c = u1.Id);
        insert cr;
        
        ApexPages.StandardController sc = new ApexPages.StandardController(cr);
        ConfirmationLetterPDFController controller = new ConfirmationLetterPDFController(sc);
        
        pageReference pageRef = page.confirmationLetterPDF_V2;
        pageRef.getParameters().put('Id',cr.Id);
        test.setCurrentPage(pageRef);
        
        delete cr;          
        sc = new ApexPages.StandardController(cr);
        controller = new ConfirmationLetterPDFController(sc);
        
        undelete cr;        
        delete con;
        sc = new ApexPages.StandardController(cr);
        controller = new ConfirmationLetterPDFController(sc);
        
        undelete con;
        sc = new ApexPages.StandardController(cr);
        controller = new ConfirmationLetterPDFController(sc);
        
        
        //Mapped         
        System.assertEquals('Passport',controller.group1Id);
        System.assertEquals(date.today(),controller.barredListDateChecked);
        System.assertEquals(null,controller.dbsDisclosureIdnumber);
        System.assertEquals(con.LastName,controller.nameOfcandidate);
        System.assertEquals('',controller.nctlNumber);
        System.assertEquals(date.Today(),controller.qtsAwardedDate);
        System.assertEquals(false,controller.qtls);
        System.assertEquals('Yes',controller.overseasPoliceCheck);
        System.assertEquals(false,controller.letterOfGoodConductReceived);
        
        //UnMapped
        controller.clearDbs = false;
        System.assertEquals(false, controller.clearDbs);
        controller.nqtInductionComplete = false;
        System.assertEquals(false, controller.nqtInductionComplete);
        controller.dbsIssueDate  = date.today();
        System.assertEquals(date.today(), controller.dbsIssueDate);
        controller.dbsCheckedOnlineDate = date.today();
        System.assertEquals(date.today(), controller.dbsCheckedOnlineDate);
        controller.nctlCheckedDate = date.today();
        System.assertEquals(date.today(), controller.nctlCheckedDate);
        controller.setCheckedDate   = date.today();
        System.assertEquals(date.today(), controller.setCheckedDate);
        controller.overseasChecksTab = 'test123';
        System.assertEquals('test123', controller.overseasChecksTab);
        controller.nameOfclient = 'test123';
        System.assertEquals('test123', controller.nameOfclient);
        controller.prohibitionFromTeachingCheck  = 'test123';  
        System.assertEquals('test123', controller.prohibitionFromTeachingCheck);
        controller.qualificationStatusActive= 'test123';
        System.assertEquals('test123', controller.qualificationStatusActive);
        controller.disqualification = 'test123';
        System.assertEquals('test123', controller.disqualification);
        List<Contact> conList=TestUtility.con;
        List<Account> accList=TestUtility.accList;
      //  TR1__Job__c  job1=TestUtility.job;
        }  
    }
    
    
}