public without sharing class ts_ProfilePageController {

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

        System.debug('userId>>'+userId);
        base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
        String communityId= null;
    
        ConnectApi.BinaryInput fileUpload = new ConnectApi.BinaryInput(EncodingUtil.base64Decode(base64Data), 'image/png', 'userImage.png');
        System.debug(fileUpload);
		ConnectApi.Photo photoProfile = ConnectApi.UserProfiles.setPhoto(null, userId,  fileUpload);

        // ConnectApi.Photo photo = ConnectApi.UserProfiles.setPhoto(communityId, parentId,fileId, EncodingUtil.base64Decode(base64Data));

    }
}