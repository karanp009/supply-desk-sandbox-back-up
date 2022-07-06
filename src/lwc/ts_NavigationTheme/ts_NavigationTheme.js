import { LightningElement } from 'lwc';
import uname_img from '@salesforce/resourceUrl/usernameimg';
import zipImages from '@salesforce/resourceUrl/zipImages';
import fetchContact from '@salesforce/apex/ts_HomePageController.fetchContact';  //Get Contact Record to check client or not.
import { NavigationMixin } from 'lightning/navigation';

export default class Ts_NavigationTheme extends NavigationMixin(LightningElement) {

    userimage = uname_img;
    account_icon = zipImages + '/Images/accounticon.png';
    compliance_icon = zipImages + '/Images/compilance.png';
    timesheet_icon = zipImages + '/Images/clockicon.png';
    usercheck;

    connectedCallback(){
        var meta = document.createElement("meta");
        meta.setAttribute("name", "viewport");
        meta.setAttribute("content", "width=device-width, initial-scale=1.0");
        document.getElementsByTagName('head')[0].appendChild(meta);

        fetchContact()
        .then(result => {
            if (result!=null) {
                console.log({result});
                if(result.Community_Contact_Type__c == 'Client'){
                    // this.checkClient = true;
                    this.checkClient = false;
                }
                else{
                    this.checkClient = true;
                    // this.checkClient = false;
                }
            } else {
                console.log('Contact null');
                console.log({result});
            }
        })
        .catch(error => {
            console.log({error});
        });
    }

    buttonclick(){
        var btn_clk = this.template.querySelector('.maincls');
        var navi_clk = this.template.querySelector('.navicon_cls');
        var home_clk = this.template.querySelector('.home_cls');
        if (btn_clk.classList.length == '1') {
            btn_clk.classList.add('closed-menu');
            navi_clk.classList.remove('hide_cls');
            home_clk.classList.remove('width_cls');
        }else {
            btn_clk.classList.remove('closed-menu');
            navi_clk.classList.add('hide_cls');
            home_clk.classList.add('width_cls');
        }
    }
    
    redirectpage(event){

        console.log({event});
        // console.log(event.target.dataset.name);

        var nameval = event.target.dataset.name;
        console.log({nameval});
        var urlValue = '/s/';
        let rmv_tab = this.template.querySelector('.icon_cls');
        console.log({rmv_tab});
        if(rmv_tab.classList.length > 1 ){
            console.log('iff');
            rmv_tab.classList.remove('selected_tab');
        }
        let tab = this.template.querySelector('[data-name="'+nameval+'"]');

        var pageapiname;
        if (nameval == 'Profile') {
            console.log('Profile');
            urlValue = urlValue + 'profile';
            pageapiname = 'Profile__c';
            tab.classList.add('selected_tab');
        }else if (nameval == 'TimeSheet') {
            urlValue = urlValue + 'timesheet';
            pageapiname = 'TimeSheet__c';
            tab.classList.add('selected_tab');
        }else if (nameval == 'Scheduler') {
            urlValue = urlValue + 'scheduler';
            pageapiname = 'Scheduler__c';
            tab.classList.add('selected_tab');
        }else if (nameval == 'Home') {
            urlValue = urlValue + '';
            pageapiname = 'Home';
            tab.classList.add('selected_tab');
        }else if (nameval == 'Help') {
            urlValue = urlValue + 'help';
            pageapiname = 'Help__c';
            tab.classList.add('selected_tab');
        }else if (nameval == 'Compliance') {
            urlValue = urlValue + 'compliance';
            pageapiname = 'Compliance__c';
            tab.classList.add('selected_tab');
        } else{
            console.log('ELSE');
        }

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageapiname,
                url: urlValue
            },
        });
    }
}