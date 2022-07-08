import { LightningElement } from 'lwc';
import Right from '@salesforce/resourceUrl/Right';
import Left from '@salesforce/resourceUrl/Left';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import earlyQualification from '@salesforce/resourceUrl/earlyQualification';
// Example :- import TRAILHEAD_LOGO from '@salesforce/resourceUrl/trailhead_logo';

export default class Ts_earlyyearqualification extends LightningElement {

    value = "eoq";
    get options() {
        return [
            { label: 'Early Year Qualification', value: 'eoq' },
        ];
    }

    Right = Right;
    Left = Left;

    renderedCallback() {
        this.test();
        console.log('before promise');
        Promise.all([
            loadStyle(this, earlyQualification),
            // loadScript(this, leaflet + '/leaflet.js'),
        ]).then(() => {
            console.log('Files loaded');
        })
        console.log('after promise');

    }

    test() {
        let aaa = this.template.querySelector('slds-dueling-list__column');
        console.log({ aaa });
    }
}