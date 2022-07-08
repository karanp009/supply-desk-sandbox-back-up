public without sharing class ts_RegisterController {
    public ts_RegisterController() {

    }

    @AuraEnabled
    public static string checkuser(String email){
        try {

            System.debug('email-->'+email);
            
            List<Contact> contlst = [SELECT Id, Name, Email FROM Contact WHERE Email =: email];
            if (contlst.size() > 0) {
                return 'Email already Exist!!!';
            } else {
                return null;
            }
            
        } catch (Exception e) {
            system.debug('e.getMessagelogin+   '+e.getMessage());
            return null;
        }
    }
    
    @AuraEnabled
    public static string createuser(String contwrapdata){
        try {
            
            System.debug('contwrapdata==>'+contwrapdata);
            contwrap cont = (contwrap)JSON.deserialize(contwrapdata,contwrap.class);
            System.debug('cont-->'+cont);
            System.debug('cont Name-->'+cont.FirstName);
            System.debug('cont Name-->'+cont.LastName);
            System.debug('cont Name-->'+cont.Email);
            
            Account acc = [SELECT Id, Name, Post_Code__c, OwnerId, TR1__Status__c, Client_Status__c, Division__c FROM Account WHERE Post_Code__c =: cont.Postcode LIMIT 1];
            
            Contact con = new Contact();
            con.RecordTypeId =  Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Client').getRecordTypeId();
            con.LastName = cont.LastName;
            con.FirstName = cont.FirstName;
            con.Email = cont.Email;
            con.Roles__c = cont.Job;
            con.MobilePhone = cont.Mobile;
            con.Phone = cont.Phone;
            // con.Postcode__c = cont.Postcode;
            // con.Owner_Alias__c = acc.Owner_Alias__c;
            // con.Contact_Type__c = acc.TR1__Status__c;
            con.TR1__Client_Status__c = acc.Client_Status__c;
            con.Division__c = acc.Division__c;
            con.OwnerId = acc.OwnerId;
            con.Enable_Community_User__c = true;
            con.AccountId = acc.Id;

            insert con;


            System.debug('con-->'+cont);
            
            return null;
            
        } catch (Exception e) {
            system.debug('e.getMessagelogin+   '+e.getMessage());
            system.debug('e.getMessagelogin+   '+e.getLineNumber());
            return null;
        }
    }

    // Forgot Password
    @AuraEnabled
    public static string forgotpassword(String usernameval){
        try {
            System.debug('username==>'+usernameval);
            List<User> usrlst = [Select Username, Email, ContactId From User where Username =: usernameval  And ContactId != null LIMIT 1];
            System.debug('usrlst==>'+usrlst);

            if(usrlst.size() == 1){
                System.debug('usrlst.get(0)==>'+usrlst.get(0));
                System.debug('usrlst.get(0)==>'+usrlst[0].Email);
                sendEmail(usrlst.get(0), usrlst[0].Email);
                return 'Email Sent Successfully!!!';
            } else {
                return 'Please Enter valid Email';
            }

        } catch (Exception e) {
            System.debug('Exception-->'+e.getLineNumber());
            System.debug('Exception-->'+e.getMessage());
            return null;
        }
    }

    public static void sendEmail(User user, String username){

        List<Messaging.SendEmailResult> listEmailResult = null;
        List<Messaging.Singleemailmessage> listSingleEmailMessages = new List<Messaging.Singleemailmessage>();
        // EmailTemplate emailTemplate = [SELECT Id, Subject, HtmlValue, Body FROM EmailTemplate WHERE DeveloperName = 'Custom_Forgot_Password_HTML']; 
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setSenderDisplayName('Community'); 
        mail.setReplyTo('ravi.m@mvclouds.com');
        mail.setTargetObjectId(user.id);
        //mail.setTemplateId(emailTemplate.id);
        // String htmlBody = emailTemplate.HtmlValue;
        // String plainBody = emailTemplate.Body;
            
        String resetUrl = Site.getBaseUrl() + '/CustomSetPassword?token=' + issueJWT(username, 600);
        System.debug('resetUrl==>'+resetUrl);
        Map<String, String> mapBodyParams = new Map<String, String> {
               '{!resetUrl}' => resetUrl
        };            
        for (String key : mapBodyParams.keySet()) {
            // htmlBody = htmlBody.‸y.replace(key, (mapBodyParams.get(key) == null) ? '' : mapBodyParams.get(key));
        }
        mail.setHtmlBody('htmlBody of EMail');
        mail.setSaveAsActivity(false);
        // mail.setPlainTextBody(plainBody);
        mail.setPlainTextBody('Email Send');
        listSingleEmailMessages.add(mail);
        // listEmailResult = Messaging.sendEmail(listSingleEmailMessages);
    }


    public static String issueJWT(String subject, Integer validFor) {
        JSONGenerator claim = JSON.createGenerator(false);
        claim.writeStartObject();
        claim.writeStringField('sub', subject);
        Long rightNow = (dateTime.now().getTime()/1000)+1;
        claim.writeNumberField('exp', (rightNow + validFor));
        claim.writeEndObject();
        String jwt = base64URLencode(Blob.valueOf(claim.getAsString()));
        Blob key = EncodingUtil.base64Decode('YOUR SECRET BASE64 ENCODED KEY');
        Blob signature = Crypto.generateMac('hmacSHA1',Blob.valueof(jwt),key);
        jwt += '.' + base64URLencode(signature);  
        return jwt;
    
    }
    

    public static String base64URLencode(Blob input){ 
        String output = encodingUtil.base64Encode(input);
        output = output.replace('+', '-');
        output = output.replace('/', '_');
        while ( output.endsWith('=')){
            output = output.subString(0,output.length()-1);
        }
        return output;
    }

    // Compliance Class
    @AuraEnabled
    public static List<TR1__Closing_Report__c> getcrdata(String userid){
        try {
            System.debug('getcrdata');
            Id loggedInUserId = [SELECT Id, ContactId FROM User where Id =: userid].ContactId;
            List<TR1__Closing_Report__c> crlist = [SELECT Id, Name, TR1__Person_Placed__c FROM TR1__Closing_Report__c WHERE TR1__Person_Placed__c =: loggedInUserId];
            System.debug('crlist-->'+crlist);
            return crlist;
        } catch (Exception e) {
            System.debug(e);
            return null;
        }
    }

    // Change Password Page
    @AuraEnabled
    public static string changepass(String oldpass, String newpass, String verifynewpass){
        try {
            System.debug('changepass');
            System.debug('oldpass->'+oldpass);
            System.debug('newpass->'+newpass);
            System.debug('verifynewpass-->'+verifynewpass);
            System.debug('Site.changePassword(newPassword, verifyNewPassword, oldpassword);    ==>'+Site.changePassword(newpass, verifynewpass, oldpass));
            PageReference pr = Site.changePassword(newpass, verifynewpass, oldpass);
            System.debug('pr-->'+pr);
            if (pr != null) {
                return 'Success';
            } else {
                return null;
            }
            
        } catch (Exception e) {
            System.debug('Exception->'+e.getLineNumber());
            System.debug('Exception->'+e.getMessage());
            return null;
        }
    }


    public class contwrap {
        
        @AuraEnabled
        public String FirstName {get;set;}
        @AuraEnabled
        public String LastName {get;set;}
        @AuraEnabled
        public String Email{get;set;}
        @AuraEnabled
        public String Job{get;set;}
        @AuraEnabled
        public String Postcode{get;set;}
        @AuraEnabled
        public String Mobile{get;set;}
        @AuraEnabled
        public String Phone{get;set;}
    }
}