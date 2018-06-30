exports.defineTag = function(dictionary) {
    dictionary.defineTag('polymerBehavior', {
        mustHaveValue: false,
        mustNotHaveDescription: false,
        canHaveType: false,
        canHaveName: true,
        onTagged: function(doclet, tag) {
            doclet.polymerBehavior = true;
        }
    });
};

exports.newDocletHandler = function(e) {
    const doclet = e.doclet;
    const polymerBehavior = doclet.polymerBehavior;

    if (polymerBehavior) {
        doclet.description += `<ul><li>Legacy Polymer Behavior</li></ul>`;
    }
}
