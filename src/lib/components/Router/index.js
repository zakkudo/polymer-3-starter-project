import 'polymer-ui-router/uirouter-router';
import Immutable from 'immutable';
import {fromJS} from 'immutable';
import ImmutableMixin from 'lib/ImmutableMixin';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {pushStateLocationPlugin} from '@uirouter/core';

export default class Router extends ImmutableMixin(PolymerElement) {
    static get template() { 
        return html`
            <uirouter-router
                location-plugin="[[locationPlugin]]"
                onStart="_handleStart"
                onFinish="_handleFinish"
                states="[[_toJSFromImmutable(routes)]]"
                auto-start></uirouter-router>
            `;
    }

    static get properties() {
        return {
            routes: {
                type: Immutable.List,
                value: () => fromJS([])
            },
            locationPlugin: {
                type: Object,
                value: () => pushStateLocationPlugin
            }
        }
    }

    _handleStart(e) {
        //TODO
        debugger;

        //get current route
        //resolve something?
        //permissions?
    eslint-plugin-polymer
        jsdoc

    }

    _handleFinish(e) {
        //TODO
        debugger;

        //use route to set on-component-change
    }
}

customElements.define('z-router', Router);
