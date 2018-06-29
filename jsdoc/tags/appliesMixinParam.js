exports.defineTag = function(dictionary) {
    dictionary.defineTag('appliesMixin', {
        mustHaveValue: true,
        mustNotHaveDescription: true,
        canHaveType: false,
        canHaveName: false,
        onTagged: function(doclet, tag) {
            if (!doclet.polymer) {
                throw new Error('Please use the @polymer tag before @appliesMixin');
            }

            if (doclet.polymer.mixinFunction) {
                throw new Error('Not compatible with @mixinFunction');
            }

            if (doclet.polymer.mixinClass) {
                throw new Error('Not compatible with @mixinClass');
            }

            tag.description = "Applies Polymer Mixin";

            doclet.polymer[tag.title] = tag;
        }
    });
};

exports.newDocletHandler = function(e) {
}
