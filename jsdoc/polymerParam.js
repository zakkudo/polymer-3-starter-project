exports.defineTag = function(dictionary) {
    dictionary.defineTag('polymer', {
        mustHaveValue: false,
        mustNotHaveDescription: true,
        canHaveType: false,
        canHaveName: false,
        onTagged: function(doclet, tag) {
            doclet.polymer = {};
        }
    });
};

exports.newDocletHandler = function(e) {
    if (e.doclet.polymer) {
        console.log(JSON.stringify(e.doclet.polymer, null, 2));

        const keys = Object.keys(e.doclet.polymer).sort();
        const values = keys.map((k) => e.doclet.polymer[k].description);

        if (values.length) {
            e.doclet.description += `<ul><li>${values.join('</li><li>')}</li></ul>`;
        }

    }
}
