exports.defineTag = function(dictionary) {
    dictionary.defineTag('mixinFunction', {
        mustHaveValue: false,
        mustNotHaveDescription: true,
        canHaveType: false,
        canHaveName: false,
        onTagged: function(doclet, tag) {
            if (!doclet.polymer) {
                throw new Error('Please use the @polymer tag before @mixinFunction');
            }

            if (doclet.polymer.mixinClass) {
                throw new Error('Not compatible with @mixinClass');
            }

            if (doclet.polymer.appliesMixin) {
                throw new Error('Not compatible with @appliesMixin');
            }

            tag.description = 'Polymer Mixin Function';
            doclet.polymer[tag.title] = tag;
        }
    });
};

exports.newDocletHandler = function(e) {
    const parameters = e.doclet.mixinFunctions;
    if (parameters) {
        e.doclet.description = `Mixin Function for augmenting functionality of the class passed ot it.`;
    }
}
