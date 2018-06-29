exports.defineTag = function(dictionary) {
    dictionary.defineTag('mixinClass', {
        mustHaveValue: false,
        mustNotHaveDescription: true,
        canHaveType: false,
        canHaveName: false,
        onTagged: function(doclet, tag) {
            if (!doclet.polymer) {
                throw new Error('Please use the @polymer tag before @mixinClass');
            }

            if (doclet.polymer.mixinFunction) {
                throw new Error('Not compatible with @mixinFunction');
            }

            if (doclet.polymer.appliesMixin) {
                throw new Error('Not compatible with @appliesMixin');
            }

            tag.description = 'Polymer Mixin Class';
            doclet.polymer[tag.title] = tag;
        }
    });
};

exports.newDocletHandler = function(e) {
    const parameters = e.doclet.mixinClasss;
    if (parameters) {
        e.doclet.description = `Mixin Class holding functionality for augmentation.`;
    }
}
