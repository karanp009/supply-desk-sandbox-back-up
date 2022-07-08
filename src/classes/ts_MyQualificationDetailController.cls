public without sharing class ts_MyQualificationDetailController {


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
        TR1__Associated_Qualification__c qualList = [SELECT Id,Gaps_Explanation__c,CV_Submitted__c FROM TR1__Associated_Qualification__c WHERE TR1__Contact__c=:conId AND qualificationName__c =: qfname LIMIT 1];
        if(qual.qualificationName__c == 'CV'){
            qualList.Gaps_Explanation__c = qual.Gaps_Explanation__c;
            qualList.CV_Submitted__c = qual.CV_Submitted__c;
        }
        else if(qual.qualificationName__c == 'Perm Qualification'){
            System.debug('Perm');
            qualList.NCTL_Number__c = qual.NCTL_Number__c;
            qualList.SET_Registration_Number__c = qual.SET_Registration_Number__c;
            qualList.QTLS__c = qual.QTLS__c;
        }
        else if(qual.qualificationName__c == 'Right to Work'){
            System.debug('Perm');
            qualList.Permanent_Right_to_Work_in_UK__c = qual.Permanent_Right_to_Work_in_UK__c;
            qualList.Documents__c = qual.Documents__c;
        }
        System.debug('qualList>>>'+qualList);
        update qualList;
        System.debug('In editQualification');
    }
}