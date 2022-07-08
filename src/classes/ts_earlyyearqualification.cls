public without sharing class ts_earlyyearqualification {
    
    @AuraEnabled
    public static String getContactId(){

        System.debug('In getContactId');

        User u  = [SELECT Id,ContactId from User where Id=:UserInfo.getUserId()];
        if(String.isNotBlank(u.contactId)){
            return u.ContactId;
        }
        else{
            return 'Id null';
        }
        
    }

    @AuraEnabled(cacheable=false)
    public static void editQuali(Id conId,String qfname,TR1__Associated_Qualification__c qual){
        System.debug('qual>>'+qual);
        TR1__Associated_Qualification__c qualList = [SELECT Id,Qualification_Type2__c,DBS_Form_Number__c,On_Update_Service__c,Qualification_Type__c FROM TR1__Associated_Qualification__c WHERE TR1__Contact__c=:conId AND qualificationName__c =: qfname LIMIT 1];
        

        if(qual.qualificationName__c == 'Perm DBS'){
            System.debug('Inside Perm DBS');
            qualList.DBS_Form_Number__c = qual.DBS_Form_Number__c;  //Early Years Qualifications
            qualList.On_Update_Service__c = qual.On_Update_Service__c;
        }else if(qual.qualificationName__c == 'Safeguarding'){
            System.debug('Inside safeguarding');
            qualList.Safeguarding_Date_Completed__c = qual.Safeguarding_Date_Completed__c; //this is the date field
        }

        System.debug('qualList>>>'+qualList);
        update qualList;
        System.debug('In editQualification');
    }
}