import { LightningElement, wire, track } from 'lwc';
import fetchContact from '@salesforce/apex/ts_HomePageController.fetchContact'; //Get Contact Record to check client or not.
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import LAST_LOGIN from '@salesforce/schema/User.LastLoginDate';
import IMG_URL from '@salesforce/schema/User.FullPhotoUrl';
import myAccountImg from '@salesforce/resourceUrl/myAccountImg';
import timeSheetImg from '@salesforce/resourceUrl/timeSheetImg';
import profileImg from '@salesforce/resourceUrl/profileImg';
import coverImgClient from '@salesforce/resourceUrl/coverImgClient';
import complianceImg from '@salesforce/resourceUrl/complianceImg';
import homeIcon from '@salesforce/resourceUrl/homeIcon';
import menuIcon from '@salesforce/resourceUrl/menuIcon';
import linkedInIcon from '@salesforce/resourceUrl/linkedInIcon';
import facebookIcon from '@salesforce/resourceUrl/facebookIcon';
import commstyle from '@salesforce/resourceUrl/CommunityCSS';
import { NavigationMixin } from 'lightning/navigation';
import { loadStyle } from 'lightning/platformResourceLoader';
import communityicon from '@salesforce/resourceUrl/communityicons';


// export default class Ts_HomePage extends LightningElement {
export default class Ts_HomePage extends NavigationMixin(LightningElement) {

    @track uName;
    @track lastLogin;
    @track checkClient;
    @track imgUrl;
    @track count = 0;
    @track isSpinner = false;
    @track reloadpage;

    // image = image + '/communityicons/image.png';
    image = communityicon + '/communityicons/image.png';
    image1 = communityicon + '/communityicons/image1.png';
    image2 = communityicon + '/communityicons/image2.png';
    image3 = communityicon + '/communityicons/image3.png';
    image4 = communityicon + '/communityicons/image4.png';



    usernameval = NAME_FIELD;

    @wire(getRecord, {
        recordId: USER_ID,
        fields: [NAME_FIELD, LAST_LOGIN, IMG_URL]
    }) wireuser({
        error,
        data
    }) {
        if (error) {
            this.error = error;
        } else if (data) {
            this.uName = data.fields.Name.value;
            console.log('this.uName-->', this.uName);
            this.lastLogin = data.fields.LastLoginDate.value;
            this.imgUrl = data.fields.FullPhotoUrl.value;
        }
    }


    renderedCallback() {
        try {
            Promise.all([
                    loadStyle(this, commstyle)
                ]).then(() => {
                    console.log('Files loaded');
                })
                .catch(error => {
                    console.log(error.body.message);
                });
        } catch (e) {
            this.reloadpage = true;
            this.template.querySelectorAll('c-ts_-error-component')[0].openModal();

        }

    }

    connectedCallback() {
        try {
            this.isSpinner = true;
            console.log('NAME_FIELD-->', this.usernameval);

            fetchContact()
                .then(result => {
                    if (result != null) {
                        console.log({ result });
                        if (result.Community_Contact_Type__c == 'Client') {
                            // this.checkClient = true;
                            this.checkClient = false;

                        } else {
                            this.checkClient = true;
                            // this.checkClient = false;

                        }
                        this.isSpinner = false;

                    } else {
                        console.log('Contact null');
                        console.log({ result });
                    }
                })
                .catch(error => {
                    console.log({ error });
                });
        } catch (e) {
            this.reloadpage = true;
            this.template.querySelectorAll('c-ts_-error-component')[0].openModal();

        }

    }

    redirectpage(event) {
        try {
            var nameval = event.target.dataset.name;
            console.log({ nameval });
            var urlValue = '/s/';
            this.isSpinner = true;

            var pageapiname;
            if (nameval == 'Profile') {
                urlValue = urlValue + 'profile';
                pageapiname = 'Profile__c';
            } else if (nameval == "Timesheets") {
                urlValue = urlValue + 'timesheet';
                pageapiname = 'TimeSheet__c';
            } else if (nameval == 'Scheduler') {
                urlValue = urlValue + 'scheduler';
                pageapiname = 'Scheduler__c';
            } else if (nameval == 'Compliance') {
                urlValue = urlValue + 'compliance';
                pageapiname = 'Compliance__c';
            }

            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: pageapiname,
                    url: urlValue
                },
            });
            this.isLoading = false;
        } catch (e) {
            this.reloadpage = true;
            this.template.querySelectorAll('c-ts_-error-component')[0].openModal();

        }

    }
    Next(event) {
        try {
            console.log('change cards');
            this.count = this.count + 1;
            console.log(this.checkClient);
            if (this.checkClient == false) {
                if (this.count == 0) {
                    let cards = this.template.querySelector('.dbsection-reporting');
                    cards.style.display = 'block';
                    let cards2 = this.template.querySelector('.dbsection-compliance');
                    cards2.style.display = 'none';
                    let cards3 = this.template.querySelector('.dbsection-timesheets');
                    cards3.style.display = 'none';
                    let prevIcon = this.template.querySelector('.previousIcon');
                    prevIcon.style.display = 'none';
                } else if (this.count == 1) {
                    let cards = this.template.querySelector('.dbsection-reporting');
                    cards.style.display = 'none';
                    let cards2 = this.template.querySelector('.dbsection-compliance');
                    cards2.style.display = 'block';
                    let cards3 = this.template.querySelector('.dbsection-timesheets');
                    cards3.style.display = 'none';
                    let prevIcon = this.template.querySelector('.previousIcon');
                    prevIcon.style.display = 'block';
                    // this.count = 0;


                } else if (this.count == 2) {
                    let cards = this.template.querySelector('.dbsection-reporting');
                    cards.style.display = 'none';
                    let cards2 = this.template.querySelector('.dbsection-compliance');
                    cards2.style.display = 'none';
                    let cards3 = this.template.querySelector('.dbsection-timesheets');
                    cards3.style.display = 'block';
                    let prevIcon = this.template.querySelector('.previousIcon');
                    let nextIcon = this.template.querySelector('.nextIcon');

                    prevIcon.style.display = 'block';
                    nextIcon.style.display = 'none';
                    // this.count = 0;

                }
            }
            if (this.checkClient == true) {
                if (this.count == 0) {
                    let cards = this.template.querySelector('.dbsection-reporting');
                    cards.style.display = 'block';
                    let cards2 = this.template.querySelector('.dbsection-compliance');
                    cards2.style.display = 'none';
                    let cards3 = this.template.querySelector('.dbsection-timesheets');
                    cards3.style.display = 'none';
                    let cards4 = this.template.querySelector('.dbsection-scheduler');
                    cards4.style.display = 'none';
                    let prevIcon = this.template.querySelector('.previousIcon');
                    prevIcon.style.display = 'none';
                } else if (this.count == 1) {
                    let cards = this.template.querySelector('.dbsection-reporting');
                    cards.style.display = 'none';
                    let cards2 = this.template.querySelector('.dbsection-compliance');
                    cards2.style.display = 'block';
                    let cards3 = this.template.querySelector('.dbsection-timesheets');
                    cards3.style.display = 'none';
                    let cards4 = this.template.querySelector('.dbsection-scheduler');
                    cards4.style.display = 'none';
                    let prevIcon = this.template.querySelector('.previousIcon');
                    prevIcon.style.display = 'block';
                    let nextIcon = this.template.querySelector('.nextIcon');
                    nextIcon.style.display = 'block';


                    // this.count = 0;


                } else if (this.count == 2) {
                    let cards = this.template.querySelector('.dbsection-reporting');
                    cards.style.display = 'none';
                    let cards2 = this.template.querySelector('.dbsection-compliance');
                    cards2.style.display = 'none';
                    let cards3 = this.template.querySelector('.dbsection-timesheets');
                    cards3.style.display = 'none';
                    let cards4 = this.template.querySelector('.dbsection-scheduler');
                    cards4.style.display = 'block';

                    let prevIcon = this.template.querySelector('.previousIcon');
                    prevIcon.style.display = 'block';
                    // this.count = 0;

                } else if (this.count == 3) {
                    let cards = this.template.querySelector('.dbsection-reporting');
                    cards.style.display = 'none';
                    let cards2 = this.template.querySelector('.dbsection-compliance');
                    cards2.style.display = 'none';
                    let cards3 = this.template.querySelector('.dbsection-timesheets');
                    cards3.style.display = 'block';
                    let cards4 = this.template.querySelector('.dbsection-scheduler');
                    cards4.style.display = 'none';
                    let prevIcon = this.template.querySelector('.previousIcon');
                    let nextIcon = this.template.querySelector('.nextIcon');

                    prevIcon.style.display = 'block';
                    nextIcon.style.display = 'none';
                    // this.count = 0;

                }


            }
        } catch (e) {
            this.reloadpage = true;
            this.template.querySelectorAll('c-ts_-error-component')[0].openModal();

        }


    }
    previous(event) {
        try {
            this.count = this.count - 1;
            if (this.checkClient == false) {

                if (this.count == 1) {
                    let cards = this.template.querySelector('.dbsection-reporting');
                    cards.style.display = 'none';
                    let cards2 = this.template.querySelector('.dbsection-compliance');
                    cards2.style.display = 'block';
                    let cards3 = this.template.querySelector('.dbsection-timesheets');
                    cards3.style.display = 'none';
                    let prevIcon = this.template.querySelector('.previousIcon');
                    prevIcon.style.display = 'block';
                    let nextIcon = this.template.querySelector('.nextIcon');
                    nextIcon.style.display = 'block';


                } else if (this.count == 0) {

                    let cards = this.template.querySelector('.dbsection-reporting');
                    cards.style.display = 'block';
                    let cards2 = this.template.querySelector('.dbsection-compliance');
                    cards2.style.display = 'none';
                    let cards3 = this.template.querySelector('.dbsection-timesheets');
                    cards3.style.display = 'none';
                    let prevIcon = this.template.querySelector('.previousIcon');
                    prevIcon.style.display = 'none';
                    let nextIcon = this.template.querySelector('.nextIcon');
                    nextIcon.style.display = 'block';


                } else if (this.count == -1) {
                    let cards = this.template.querySelector('.dbsection-reporting');
                    cards.style.display = 'none';
                    let cards2 = this.template.querySelector('.dbsection-compliance');
                    cards2.style.display = 'none';
                    let cards3 = this.template.querySelector('.dbsection-timesheets');
                    cards3.style.display = 'block';
                    let prevIcon = this.template.querySelector('.previousIcon');
                    let nextIcon = this.template.querySelector('.nextIcon');

                    prevIcon.style.display = 'block';
                    nextIcon.style.display = 'none';
                    this.count = 0;

                }
            }


            if (this.checkClient == true) {
                if (this.count == 2) {
                    let cards = this.template.querySelector('.dbsection-reporting');
                    cards.style.display = 'none';
                    let cards2 = this.template.querySelector('.dbsection-compliance');
                    cards2.style.display = 'none';
                    let cards3 = this.template.querySelector('.dbsection-timesheets');
                    cards3.style.display = 'none';
                    let cards4 = this.template.querySelector('.dbsection-scheduler');
                    cards4.style.display = 'block';
                    let prevIcon = this.template.querySelector('.previousIcon');
                    prevIcon.style.display = 'block';
                    let nextIcon = this.template.querySelector('.nextIcon');
                    nextIcon.style.display = 'block';


                } else if (this.count == 0) {

                    let cards = this.template.querySelector('.dbsection-reporting');
                    cards.style.display = 'block';
                    let cards2 = this.template.querySelector('.dbsection-compliance');
                    cards2.style.display = 'none';
                    let cards3 = this.template.querySelector('.dbsection-timesheets');
                    cards3.style.display = 'none';
                    let cards4 = this.template.querySelector('.dbsection-scheduler');
                    cards4.style.display = 'none';
                    let prevIcon = this.template.querySelector('.previousIcon');
                    prevIcon.style.display = 'none';
                    let nextIcon = this.template.querySelector('.nextIcon');
                    nextIcon.style.display = 'block';

                } else if (this.count == 1) {
                    let cards = this.template.querySelector('.dbsection-reporting');
                    cards.style.display = 'none';
                    let cards2 = this.template.querySelector('.dbsection-compliance');
                    cards2.style.display = 'block';
                    let cards3 = this.template.querySelector('.dbsection-timesheets');
                    cards3.style.display = 'none';
                    let cards4 = this.template.querySelector('.dbsection-scheduler');
                    cards4.style.display = 'none';
                    let prevIcon = this.template.querySelector('.previousIcon');
                    let nextIcon = this.template.querySelector('.nextIcon');

                    prevIcon.style.display = 'block';
                    nextIcon.style.display = 'block';

                }
            }

        } catch (e) {
            this.reloadpage = true;
            this.template.querySelectorAll('c-ts_-error-component')[0].openModal();

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

    // img1 = image1;
    // img2 = image2;
    // img3 = image3;
    // img4 = image4;
    // img5 = image5;
}