import {__} from 'lib/Translator';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import TranslatorMixin from 'lib/mixins/TranslatorMixin';

/**
 * @module Application/pages/AboutPage
 * @customElement
 * @polymer
 */
export default class AboutPage extends TranslatorMixin(PolymerElement) {
    /**
     * The default page title
     */
    static get title() {
        return __('About');
    }

    static get resolve() {
        return {
            localization: (locale) => {
                return import(`./.locales/${locale}`);
            },
        };
    }

    /**
     * @property {String} is - The HTML tag representing the component.
     */
    static get is() {
        return 'z-about-page';
    }

    /**
     * @property {Native.DocumentFragment} template - Template used for
     * rendering the contents of the component.
     */
    static get template() {
        return html`
          <h2>[[ __('Welcome to the about page!') ]]</h2>

          <p>[[__n('There is one user', 'There are %d users', 2)]]</p>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada, erat sit amet fermentum sollicitudin, tellus tellus vulputate quam, non faucibus arcu sapien id nunc. Donec in magna ultricies, molestie lorem sit amet, volutpat augue. Nunc libero risus, sodales at justo et, hendrerit pellentesque purus. In nec vehicula neque. Praesent aliquam lacus vitae risus hendrerit, ut volutpat ex volutpat. Sed dui dui, pulvinar ac vestibulum quis, ultrices placerat nisi. Nam consectetur eros non felis congue, vel tincidunt turpis aliquet. Curabitur gravida convallis sollicitudin. Curabitur ut mauris et massa pellentesque scelerisque sed sed odio.</p>

<p>Etiam porttitor neque cursus justo dictum vehicula. Donec finibus sem ipsum, a viverra quam gravida non. Maecenas facilisis nibh condimentum, tempus mauris et, varius arcu. Pellentesque ultricies maximus vehicula. Ut nec porttitor lacus. Sed id urna vel tellus laoreet bibendum placerat a turpis. Curabitur nec felis vestibulum, semper nisl et, tempor massa. Aenean nec orci tortor. Suspendisse in urna feugiat, ullamcorper metus nec, dapibus nulla. Aliquam molestie nisl ligula, ut posuere lectus fermentum quis. Curabitur non eros augue. Proin id felis in dolor faucibus ullamcorper faucibus quis nisl.</p>
      `;
    }
}

customElements.define(AboutPage.is, AboutPage);

