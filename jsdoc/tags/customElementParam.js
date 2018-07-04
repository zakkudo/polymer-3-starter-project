exports.defineTag = function(dictionary) {
    dictionary.defineTag('customElement', {
        mustHaveValue: false,
        mustNotHaveDescription: true,
        canHaveType: false,
        canHaveName: false,
        onTagged: function(doclet, tag) {
            doclet.customElement = true;
        }
    });
};

exports.newDocletHandler = function(e) {
    if (e.doclet.customElement && !e.doclet.polymer) {
        e.doclet.description += `<ul><li>Custom Element</li></ul>`;
    }
}
