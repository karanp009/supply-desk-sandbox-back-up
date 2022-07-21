public without sharing class ts_ProfilePageController {

    @AuraEnabled
    public static void saveData(User usr){
        try {
            if(usr.Id == userInfo.getUserId()){
                update usr;
            }
            //ConnectApi.Photo photo = ConnectApi.ChatterUsers.setPhoto(communityId, userId, new ConnectApi.BinaryInput(b, 'image/jpg', 'userImage.jpg'));
    
            System.debug('usr>>'+usr);
        } catch (Exception e) {
            system.debug('e.getMessagelogin+   '+e.getMessage());
            GenericException Exp = ExceptionHandler.logException(e, 'ts_ProfilePageController', 'saveData');
        }
    }

    @AuraEnabled
    public static User getData(){
        try{
            User usr = [SELECT Id,FirstName,LastName,Email,Phone,MobilePhone,FullPhotoUrl FROM User WHERE Id=:UserInfo.getUserId()];
            System.debug(usr + ' user info is');
            return usr;
        } catch (Exception e) {
            system.debug('e.getMessagelogin+   '+e.getMessage());
            GenericException Exp = ExceptionHandler.logException(e, 'ts_ProfilePageController', 'getData');
            return null;
        }
    }
    
    @AuraEnabled
    public static List<ContentDocument> getDocsData(){
        try{

            User usr = [SELECT Id,ContactId FROM User WHERE Id=:UserInfo.getUserId()];
            List<ContentDocumentLink> contentLink = [SELECT Id, ContentDocumentId FROM ContentDocumentLink where LinkedEntityId =: usr.ContactId];
            Set<Id> conId = new Set<Id>();
            for(ContentDocumentLink con : contentLink){
                conId.add(con.ContentDocumentId);
            }
            List<ContentDocument> contentData = [SELECT Id, Title FROM ContentDocument WHERE Id IN: conId];
            return contentData;
        } catch (Exception e) {
            system.debug('e.getMessagelogin+   '+e.getMessage());
            GenericException Exp = ExceptionHandler.logException(e, 'ts_ProfilePageController', 'getData');
            return null;
        }
    }

    @AuraEnabled
    public static Contact fetchContact(){
        try {
            Id idContact = [SELECT Id, ContactId FROM User where Id=: UserInfo.getUserId()].ContactId;
    
            if(idContact != null){
                Contact con = [SELECT Id,Community_Contact_Type__c, Consol_URL__c FROM Contact WHERE Id = :idContact];
                System.debug('con>>>'+con);
                return con;
            }
            return null;    
        } catch (Exception e) {
            system.debug('e.getMessagelogin+   '+e.getMessage());
            GenericException Exp = ExceptionHandler.logException(e, 'ts_ProfilePageController', 'fetchContact');
            return null;
        }

    }

    @AuraEnabled
    public static String saveFile(String userId, String fileId, String base64Data) { 
        try{

            System.debug('userId>>'+userId);
            base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
            String communityId= null;
        
            ConnectApi.BinaryInput fileUpload = new ConnectApi.BinaryInput(EncodingUtil.base64Decode(base64Data), 'image/png', 'userImage.png');
            System.debug(fileUpload);
            ConnectApi.Photo photoProfile = ConnectApi.UserProfiles.setPhoto(null, userId,  fileUpload);

            // ConnectApi.Photo photo = ConnectApi.UserProfiles.setPhoto(communityId, parentId,fileId, EncodingUtil.base64Decode(base64Data));
            return 'Success';
        } catch (Exception e) {
            system.debug('e.getMessagelogin+   '+e.getMessage());
            GenericException Exp = ExceptionHandler.logException(e, 'ts_ProfilePageController', 'saveFile');
            String data = 'getMessagelogin+   '+e.getMessage() + 'line no => '+e.getLineNumber();
            return data;
        }
    }

    @AuraEnabled
    public static void deleteFile(String userId) { 
        try{
            ConnectApi.UserProfiles.deletePhoto(null,userId);
        } catch (Exception e) {
            system.debug('e.getMessagelogin+   '+e.getMessage());
            GenericException Exp = ExceptionHandler.logException(e, 'ts_ProfilePageController', 'deleteFile');
        }
    }

    @AuraEnabled
    public static void saveCV(String parentId, String fileName, String base64Data) { 
        try{

            base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
            ContentVersion contentVersion = new ContentVersion();
            contentVersion.ContentLocation = 'S'; //S-Document is in Salesforce. E-Document is outside of Salesforce. L-Document is on a Social Netork.
            contentVersion.PathOnClient = fileName;//File name with extention
            contentVersion.Origin = 'C';//C-Content Origin. H-Chatter Origin.
            contentVersion.OwnerId = UserInfo.getUserId();//Owner of the file
            contentVersion.Title = fileName;//Name of the file
            contentVersion.VersionData = EncodingUtil.base64Decode(base64Data);//File content
            contentVersion.Description = 'CV Upload From My Account';
            insert contentVersion;

            //After saved the Content Verison, get the ContentDocumentId
            ContentVersion contentData = [SELECT Id, Title, ContentDocumentId FROM ContentVersion WHERE Id =:contentVersion.Id];

            //Insert ContentDocumentLink
            // ContentDocumentLink contentDocumentLink = new ContentDocumentLink();
            // contentDocumentLink.ContentDocumentId = contentData.contentDocumentId;//Add ContentDocumentId
            // contentDocumentLink.LinkedEntityId = parentId;//Add attachment parentId
            // contentDocumentLink.ShareType = 'V';//V - Viewer permission. C - Collaborator permission. I - Inferred permission.
            // contentDocumentLink.Visibility = 'AllUsers';//AllUsers, InternalUsers, SharedUsers
            // insert contentDocumentLink;

            List<String> lst = new List<String> {contentData.contentDocumentId, contentData.Title};

        } catch (Exception e) {
            system.debug('e.getMessagelogin+   '+e.getMessage());
            GenericException Exp = ExceptionHandler.logException(e, 'ts_ProfilePageController', 'saveCV');
        }

    }
}