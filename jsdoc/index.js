/**
 * Add polymer tag suppor to jsdoc
 */
const customElement = require('./customElementParam');
const polymer = require('./polymerParam');
const appliesMixin = require('./appliesMixinParam');
const mixinClass = require('./mixinClassParam');
const mixinFunction = require('./mixinFunctionParam');
const polymerBehavior = require('./polymerBehaviorParam');

exports.defineTags = function(dictionary) {
    customElement.defineTag(dictionary);
    polymer.defineTag(dictionary);
    appliesMixin.defineTag(dictionary);
    mixinClass.defineTag(dictionary);
    mixinFunction.defineTag(dictionary);
    polymerBehavior.defineTag(dictionary);
};

exports.handlers = {
  newDoclet: function(e) {
    polymer.newDocletHandler(e);
    customElement.newDocletHandler(e);
  }
}
