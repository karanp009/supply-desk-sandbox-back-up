import { LightningElement, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import LAST_LOGIN from '@salesforce/schema/User.LastLoginDate';
import myAccountImg from '@salesforce/resourceUrl/myAccountImg';
import timeSheetImg from '@salesforce/resourceUrl/timeSheetImg';
import profileImg from '@salesforce/resourceUrl/profileImg';
import coverImgClient from '@salesforce/resourceUrl/coverImgClient';
import complianceImg from '@salesforce/resourceUrl/complianceImg';
import homeIcon from '@salesforce/resourceUrl/homeIcon';
import menuIcon from '@salesforce/resourceUrl/menuIcon';
import linkedInIcon from '@salesforce/resourceUrl/linkedInIcon';
import facebookIcon from '@salesforce/resourceUrl/facebookIcon';
import image1 from '@salesforce/resourceUrl/image1Ts';
import image2 from '@salesforce/resourceUrl/image2Ts';
import image3 from '@salesforce/resourceUrl/image3Ts';
import image4 from '@salesforce/resourceUrl/image4Ts';
import image5 from '@salesforce/resourceUrl/image5Ts';


export default class Ts_HomePage extends LightningElement {

    @track uName;
    @track lastLogin;
    @wire(getRecord, {
        recordId: USER_ID,
        fields: [NAME_FIELD,LAST_LOGIN]
    }) wireuser({
        error,
        data
    }) {
        if (error) {
           this.error = error ; 
        } else if (data) {
            this.uName = data.fields.Name.value;
            this.lastLogin = data.fields.LastLoginDate.value;
        }
    }

    myAccImg = myAccountImg;
    tmSheetImg = timeSheetImg;
    profImg = profileImg;
    cvrImg = coverImgClient;
    cmpImg = complianceImg;
    hmIcon = homeIcon;
    mnIcon = menuIcon;
    linkedIcon = linkedInIcon;
    fbIcon = facebookIcon;

    img1 = image1;
    img2 = image2;
    img3 = image3;
    img4 = image4;
    img5 = image5;
}