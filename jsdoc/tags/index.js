/**
 * Add polymer tag suppor to jsdoc
 */
const customElement = require('./customElementParam');
const polymer = require('./polymerParam');
const appliesMixin = require('./appliesMixinParam');
const mixinClass = require('./mixinClassParam');
const mixinFunction = require('./mixinFunctionParam');
const polymerBehavior = require('./polymerBehaviorParam');
const redux = require('./reduxParam');
const reduxActionType = require('./reduxActionTypeParam');
const reduxActionCreator = require('./reduxActionCreatorParam');
const reduxActionScope = require('./reduxActionScopeParam');
const reduxReducer = require('./reduxReducerParam');

exports.defineTags = function(dictionary) {
    customElement.defineTag(dictionary);
    polymer.defineTag(dictionary);
    appliesMixin.defineTag(dictionary);
    mixinClass.defineTag(dictionary);
    mixinFunction.defineTag(dictionary);
    polymerBehavior.defineTag(dictionary);
    redux.defineTag(dictionary);
    reduxActionType.defineTag(dictionary);
    reduxActionCreator.defineTag(dictionary);
    reduxReducer.defineTag(dictionary);
    reduxActionScope.defineTag(dictionary);
};

exports.handlers = {
  newDoclet: function(e) {
    polymer.newDocletHandler(e);
    customElement.newDocletHandler(e);
    polymerBehavior.newDocletHandler(e);
    redux.newDocletHandler(e);
  }
}
