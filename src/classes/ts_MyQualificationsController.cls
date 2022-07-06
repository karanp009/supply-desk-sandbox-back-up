public with sharing class ts_MyQualificationsController {


    @AuraEnabled
    public static List<TR1__Associated_Qualification__c> getQualification(){

        List<Schema.FieldSetMember> lstFieldSet = new List<Schema.FieldSetMember>(); 
        Contact con = [SELECT Id FROM Contact WHERE Id = '0030C00000SPlMiQAL']; //Added for test
        System.debug('test');
        List<TR1__Associated_Qualification__c> qualiList = new List<TR1__Associated_Qualification__c>();
        String fieldNames ='';
        String strQuery = 'Select Id'; 
        lstFieldSet = SObjectType.TR1__Associated_Qualification__c.FieldSets.getMap().get('RC_QualificationInfo').getFields(); 
        
        for(Schema.FieldSetMember field : lstFieldSet){
            fieldNames += ', ' + field.getFieldPath();
        }
        
        strQuery  += fieldNames + ' from TR1__Associated_Qualification__c where TR1__Contact__c = \'' + con.Id + '\' ORDER BY Name ASC' ;      
        qualiList = Database.query(strQuery);
        return qualiList;

    }
}