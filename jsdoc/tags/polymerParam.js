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
        const keys = Object.keys(e.doclet.polymer).sort();
        const polymer = e.doclet.polymer || {};
        const values = keys.map((k) => {
            const value = polymer[k].value;
            const description = polymer[k].description;
            const list = [description];

            if (value) {
                list.push(`(${value})`);
            }

            return list.join(' ');
        });

        if (values.length) {
            e.doclet.description += `<ul><li>${values.join('</li><li>')}</li></ul>`;
        }

    }
}
