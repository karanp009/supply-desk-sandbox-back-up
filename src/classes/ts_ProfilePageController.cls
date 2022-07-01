public with sharing class ts_ProfilePageController {

    @AuraEnabled
    public static void saveData(User usr){

        if(usr.Id == userInfo.getUserId()){
            update usr;
        }
        //ConnectApi.Photo photo = ConnectApi.ChatterUsers.setPhoto(communityId, userId, new ConnectApi.BinaryInput(b, 'image/jpg', 'userImage.jpg'));

        System.debug('usr>>'+usr);
    }

    @AuraEnabled
    public static User getData(){
       User usr = [SELECT Id,FirstName,LastName,Email,Phone,MobilePhone,FullPhotoUrl FROM User WHERE Id=:UserInfo.getUserId()];
       return usr;
    }

    @AuraEnabled
    public static void saveFile(String userId, String fileId, String base64Data) { 

        // System.debug('save file');
        // System.debug('parentId>>'+parentId);
        System.debug('userId>>'+userId);
        base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');

        // //Insert ContentVersion
        // ContentVersion contentVersion = new ContentVersion();
        // contentVersion.ContentLocation = 'S'; //S-Document is in Salesforce. E-Document is outside of Salesforce. L-Document is on a Social Netork.
        // contentVersion.PathOnClient = fileName;//File name with extention
        // contentVersion.Origin = 'C';//C-Content Origin. H-Chatter Origin.
        // contentVersion.OwnerId = UserInfo.getUserId();//Owner of the file
        // contentVersion.Title = fileName;//Name of the file
        // contentVersion.VersionData = EncodingUtil.base64Decode(base64Data);//File content
        // insert contentVersion;

        // //After saved the Content Verison, get the ContentDocumentId
        // Id contentDocumentId = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:contentVersion.Id].ContentDocumentId;

        // //Insert ContentDocumentLink
        // ContentDocumentLink contentDocumentLink = new ContentDocumentLink();
        // contentDocumentLink.ContentDocumentId = contentDocumentId;//Add ContentDocumentId
        // contentDocumentLink.LinkedEntityId = parentId;//Add attachment parentId
        // contentDocumentLink.ShareType = 'I';//V - Viewer permission. C - Collaborator permission. I - Inferred permission.
        // contentDocumentLink.Visibility = 'AllUsers';//AllUsers, InternalUsers, SharedUsers
        // insert contentDocumentLink;

        // ContentDocument cdList = [SELECT Id, Title, Description FROM ContentDocument WHERE Id =:contentDocumentId];
        // cdList.description = description;
        // update cdList;

        // if(bool == false){
        //     ContentDocument cd = [SELECT Id, Title, Description FROM ContentDocument ORDER BY LastModifieddate DESC LIMIT 1];
        //     delete cd;
        // }

        String communityId= null;
        // String base64Content = ( String ) JSON.deserialize( base64Data, String.class );

        ConnectApi.BinaryInput fileUpload = new ConnectApi.BinaryInput(EncodingUtil.base64Decode(base64Data), 'image/png', 'userImage.png');
        System.debug(fileUpload);
		ConnectApi.Photo photoProfile = ConnectApi.UserProfiles.setPhoto(null, userId,  fileUpload);

        // ConnectApi.Photo photo = ConnectApi.UserProfiles.setPhoto(communityId, parentId,fileId, EncodingUtil.base64Decode(base64Data));

    }
}