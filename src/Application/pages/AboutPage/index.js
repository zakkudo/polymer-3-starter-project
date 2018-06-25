import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

 /**
   * description
   * @customElement
   * @polymer
   *
   */
export default class AboutPage extends PolymerElement {
    /**
     * description
     */
    static get is() {
        return 'z-about-page';
    }

    /**
     * description
     * @param {Object} e The element to be made awesome.
     */
    static get template() {
        return html`
          <h2> Welcome to the about page!</h2>

          <p>We have lots of informaiton on this website here.  YOu should look around and read a lot.</p>
      `;
    }
}

customElements.define(AboutPage.is, AboutPage);

