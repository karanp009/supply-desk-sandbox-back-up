import { LightningElement, api, wire, track } from 'lwc';
import sendicon from '@salesforce/resourceUrl/SendIcon';
import location_icon from '@salesforce/resourceUrl/ContactUS_location';
import sendEmailToController from '@salesforce/apex/ts_ContactUSController.sendEmailToController';
import sd_logo from '@salesforce/resourceUrl/SD_Logo';

export default class Ts_ContactUs extends LightningElement {

      bglogo = sd_logo;
      Name = "";
      Subject = "";
      Email = "";
      Body = "";

      handleToNameChange(event){
            this.Name = event.target.value;
      }

      handleSubjectChange(event){
            this.Subject = event.target.value;
      }

      handleEmailChange(event){
            this.Email = event.target.value;
      }

      handleBodyChange(event){
            this.Body = event.target.value;
      }

      handleSendClick(event){
            console.log(this.Name);
            console.log(this.Subject);
            console.log(this.Email);
            console.log(this.Body);
            const recordInput = {Name:this.Name , Subject:this.Subject, Email:this.Email, Body:this.Body} 
            sendEmailToController(recordInput)
            .then( () => {
                console.log('Success');
            }).catch( error => {
                console.log('Error');
            })
      }
}