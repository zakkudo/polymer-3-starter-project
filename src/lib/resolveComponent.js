import getTypeName from 'lib/getTypeName';
import Translator from 'lib/Translator';
import shallowResolve from 'lib/shallowResolve';
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {fromJS} from 'immutable';

/**
 * @private
 */
function requestComponent(component) {
    switch (typeof component) {
        case 'function':
            // Return component class
            if (component instanceof PolymerElement) {
                return Promise.resolve(component);
            }

            // Return deferred action to get the component
            return component();
        case 'string':
            // Return the status component
            return Promise.resolve(customElements.get(component));
    }

    return Promise.reject(new TypeError(`${getTypeName(component)} is not invalid`));
}

/**
 * @private
 */
function getResolveInformation(component) {
    const resolve = component.resolve || {};
    const data = resolve.data || {};
    const localization = resolve.localization;
    const message = resolve.message;

    return {data, localization, message};
}

function resolveLocalization(getLocalization) {
    const locale = Translator.getLocale();

    if (getLocalization && locale) {
        return getLocalization(locale).then((response) => {
            return {
                localization: response.default, //JSON adds default?
                locale,
            };
        });
    }

    return Promise.resolve({});
}

/**
 * Helper to assist in loading components asynchronously as well as
 * any of it's dependancies.
 * @param {PolymerElement|Function|String} component - A PolymerElement class, a function that
 * when calls resolves to a PolymerElement, or a string that is the name of the regestered custom
 * element.
 * @return {Object} A promise that resolves to the component and chains loadin of data
 * @module lib/resolveComponent
 */
export default function resolveComponent(component, match) {
    const next = requestComponent(component)
        .then((Component) => {
            const {data, localization, message} = getResolveInformation(Component);

            return resolveLocalization(localization).then(({locale, localization: _localization}) => {
                const localization = fromJS(_localization);
                const next = shallowResolve(data, match).then((_response) => {
                    const response = fromJS(_response).set('match', match);

                    return {
                        message,
                        Component,
                        locale,
                        localization,
                        response,
                    };
                });

                return {
                    message,
                    Component,
                    locale,
                    localization,
                    next,
                };
            });
        });

    return Promise.resolve({
        message: null,
        next,
    });
}
