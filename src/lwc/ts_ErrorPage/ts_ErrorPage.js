import { LightningElement } from 'lwc';
import communityicon from '@salesforce/resourceUrl/communityicons';

export default class Ts_ErrorPage extends LightningElement {


    astro = communityicon + '/communityicons/astronaut.png';        //For Astronaut image

    connectedCallback() {

        var meta = document.createElement("meta");
        meta.setAttribute("name", "viewport");
        meta.setAttribute("content", "width=device-width, initial-scale=1.0");
        document.getElementsByTagName('head')[0].appendChild(meta);

        setTimeout(() => {
            
            var body = this.template.querySelector('.body');
            setInterval(createStar, 100);
            function createStar() {
                var right = Math.random() * 500;
                var top = Math.random() * screen.height;
                var star = document.createElement("div");
                star.classList.add("star");
                body.appendChild(star);
                setInterval(runStar, 10);
                star.style.position = 'absolute';
                star.style.width = '2px';
                star.style.height = '2px';
                star.style.background = 'white';
                star.style.animation = 'starTwinkle 3s infinite linear';
                star.style.top = top + "px";

                function runStar() {
                    if (right >= screen.width) {
                        star.remove();
                    }
                    right += 3;
                    star.style.right = right + "px";
                }
            }
        }, 500);
    }
}