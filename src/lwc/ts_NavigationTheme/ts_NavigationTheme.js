import { LightningElement, track } from 'lwc';
import fetchContact from '@salesforce/apex/ts_HomePageController.fetchContact';  //Get Contact Record to check client or not.
import { NavigationMixin } from 'lightning/navigation';
import communityicon from '@salesforce/resourceUrl/communityicons';

export default class Ts_NavigationTheme extends NavigationMixin(LightningElement) {

    account_icon = communityicon + '/communityicons/menumyaccount.png';
    compliance_icon = communityicon + '/communityicons/menucompliance.png';
    timesheet_icon = communityicon + '/communityicons/menutimesheet.png';
    scheduler_icon = communityicon + '/communityicons/menuscheduler.png';
    home_icon = communityicon + '/communityicons/homepage.png';
    fb_icon = communityicon + '/communityicons/facebook.png';
    in_icon = communityicon + '/communityicons/linkedin.png';
    help_icon = communityicon + '/communityicons/help.png';
    logout_icon = communityicon + '/communityicons/logout.png';
    menu_icon = communityicon + '/communityicons/menubar.png';
    usercheck;
    candidatecss;
    @track checkClient;     // Check user client or candidate
    @track reloadpage;      // For Reload Page

    connectedCallback() {
        var meta = document.createElement("meta");
        meta.setAttribute("name", "viewport");
        meta.setAttribute("content", "width=device-width, initial-scale=1.0");
        document.getElementsByTagName('head')[0].appendChild(meta);

        fetchContact()
            .then(result => {
                if (result != null) {
                    if (result.Community_Contact_Type__c == 'Client') {
                        this.checkClient = false;
                    }
                    else {
                        this.checkClient = true;
                    }
                } 
            })
            .catch(error => {
                this.reloadpage = true;
                this.template.querySelectorAll('c-ts_-error-component')[0].openModal();
            });
    }

    renderedCallback() {

        try {
            
            const queryString = window.location.href;
            let tab;
            if (queryString.toLowerCase().includes('profile')) {
                tab = this.template.querySelectorAll('[data-name="profile"]');
                tab.forEach(element => {
                    element.classList.add('selected_tab');
                });
            } else if (queryString.toLowerCase().includes('timesheet')) {
                tab = this.template.querySelectorAll('[data-name="timesheet"]');
                tab.forEach(element => {
                    element.classList.add('selected_tab');
                });
            } else if (queryString.toLowerCase().includes('compliance')) {
                tab = this.template.querySelectorAll('[data-name="compliance"]');
                tab.forEach(element => {
                    element.classList.add('selected_tab');
                });
            } else if (queryString.toLowerCase().includes('scheduler')) {
                tab = this.template.querySelectorAll('[data-name="scheduler"]');
                tab.forEach(element => {
                    element.classList.add('selected_tab');
                });
            } 
        } catch (error) {
            this.reloadpage = true;
            this.template.querySelectorAll('c-ts_-error-component')[0].openModal();
        }
    }

    buttonclick() {

        try {
            var btn_clk = this.template.querySelector('.maincls');
            var navi_clk = this.template.querySelector('.navicon_cls');
            var home_clk = this.template.querySelector('.home_cls');
            if (btn_clk.classList.length == '1') {
                btn_clk.classList.add('closed-menu');
                navi_clk.classList.remove('hide_cls');
                home_clk.classList.remove('width_cls');
            } else {
                btn_clk.classList.remove('closed-menu');
                navi_clk.classList.add('hide_cls');
                home_clk.classList.add('width_cls');
            }
        } catch (error) {
            this.reloadpage = true;
            this.template.querySelectorAll('c-ts_-error-component')[0].openModal();   
        }
    }

    redirectpage(event) {

        try {
            var nameval = event.currentTarget.dataset.name;
            var urlValue = '/s/';
            let rmv_tab = this.template.querySelectorAll('.icon_cls');
            rmv_tab.forEach(element => {
                if (element.classList.length > 1) {
                    element.classList.remove('selected_tab');
                } 
            });
            let tab = this.template.querySelectorAll('[data-name="' + nameval + '"]');
            var pageapiname;

            tab.forEach(element => {

                if (nameval == 'profile') {
                    urlValue = urlValue + 'profile';
                    pageapiname = 'Profile__c';
                    element.classList.add('selected_tab');
                } else if (nameval == 'timesheet') {
                    urlValue = urlValue + 'timesheet';
                    pageapiname = 'TimeSheet__c';
                    element.classList.add('selected_tab');
                } else if (nameval == 'scheduler') {
                    urlValue = urlValue + 'scheduler';
                    pageapiname = 'Scheduler__c';
                    element.classList.add('selected_tab');
                } else if (nameval == 'Home') {
                    urlValue = urlValue + '';
                    pageapiname = 'Home';
                } else if (nameval == 'Help') {
                    urlValue = urlValue + 'help';
                    pageapiname = 'Help__c';
                } else if (nameval == 'compliance') {
                    urlValue = urlValue + 'compliance';
                    pageapiname = 'Compliance__c';
                    element.classList.add('selected_tab');
                } else if (nameval == 'Logout') {
                    this[NavigationMixin.Navigate]({
                        type: 'comm__loginPage',
                        attributes: {
                            actionName: 'logout'
                        },
                    });
                }
            });

            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: pageapiname,
                    url: urlValue
                },
            });

            var btn_clk = this.template.querySelector('.maincls');
            var navi_clk = this.template.querySelector('.navicon_cls');
            var home_clk = this.template.querySelector('.home_cls');
            btn_clk.classList.add('closed-menu');
            navi_clk.classList.remove('hide_cls');
            home_clk.classList.remove('width_cls');
        } catch (error) {
            this.reloadpage = true;
            this.template.querySelectorAll('c-ts_-error-component')[0].openModal();   
        }
    }
}