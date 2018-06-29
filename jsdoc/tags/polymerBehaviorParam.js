exports.defineTag = function(dictionary) {
    dictionary.defineTag('polymerBehavior', {
        mustHaveValue: true,
        mustNotHaveDescription: false,
        canHaveType: false,
        canHaveName: false,
        onTagged: function(doclet, tag) {
            doclet.polymer[tag.title] = tag;
        }
    });
};

exports.newDocletHandler = function(e) {
    if (e.doclet.polymer.polymerBehavior) {
        e.doclet.description = `TBA`;
    }
}
