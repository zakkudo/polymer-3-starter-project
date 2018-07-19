import HttpError from 'lib/errors/HttpError';
import Immutable from 'immutable';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {fromJS} from 'immutable';

/**
 * @private
 * @param {String} message - A loading message.
 * @throws {HttpError} The error in resolve format.
 */
function normalizeError(reason) {
    let message = null;
    let status = null;

    if (reason instanceof HttpError) {
        return reason;
    }

    if (reason instanceof Error) {
        return new HttpError(
            -1,
            'Internal Error',
            '',
            null,
            reason.message
        );
    } else if (typeof reason === 'string') {
        return new HttpError(
            -1,
            'Internal Error',
            '',
            null,
            reason
        );
    } else if (Object(reason) === reason) {
        return new HttpError(
            reason.status || 'Missing status error',
            reason.statusText || '',
            reason.url || '',
            null,
            reason.message || 'Missing error message'
        );
    }

    return new HttpError(
        status,
        message
    );
}



/**
 * Used by the `z-router` internally to control what properties are sent
 * to individual page components.
 * @private
 * @module lib/components/Router
 * @customElement
 * @polymer
 */
export default class Route extends PolymerElement {
    /**
     * @private
     * @property {String} is - The HTML tag representing the component.
     */
    static get is() {
        return 'z-route';
    }

    /**
     * @private
     * @property {DocumentFragment} template - Template used for
     * rendering the contents of the component.
     */
    static get template() {
        return html``;
    }

    /**
     * @private
     * @property {Object} properties - Public Properties.
     */
    static get properties() {
        return {
            component: String,
            resolve: Immutable.Map,
            title: String,
            match: Immutable.Map,
        };
    }

    /**
     * @private
     */
    static get observers() {
        return [
            '_componentChanged(component, resolve)',
            '_titleChanged(title)',
            '_matchChanged(match)',
        ];
    }

    _titleChanged(title) {
        const component = this.getComponent();

        if (component) {
            component.set('title', title);
        }
    }

    _matchChanged(match) {
        const component = this.getComponent();

        if (component) {
            component.set('match', match);
        }
    }

    _handleTitleChange(e) {
        const detail = e.detail || {};

        this.dispatchEvent(new CustomEvent('title-change', {detail}));
    }

    getComponent() {
        return this.shadowRoot.firstChild;
    }

    setComponent(component, data = fromJS({})) {
        const element = document.createElement(component.is);

        element.addEventListener('title-change', this._handleTitleChange.bind(this));

        data.keySeq().forEach((k) => {
            element.set(k, data.get(k));
        });

        Array.from(this.shadowRoot.childNodes).forEach((n) => {
            this.shadowRoot.removeChild(n);
        });

        this.shadowRoot.appendChild(element);
    }

    _componentChanged(component, resolve = fromJS({})) {
        const errorMessageComponent = this.errorMessageComponent;
        const title = this.title;
        const match = this.match;
        const error = resolve.get('error');
        const response = resolve.get('response');

        if (error && errorMessageComponent) {
            this._component = errorMessageComponent;
            this.setComponent(errorMessageComponent, fromJS({
                title: title,
                error: normalizeError(error),
            }));
        } else if (component !== this._component) {
            if (component && response) {
                this._component = component;
                this.setComponent(component, response.merge({title, match}));
            }
        }
    }
}

customElements.define(Route.is, Route);

