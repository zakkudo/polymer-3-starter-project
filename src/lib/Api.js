function generateFetch(data, defaultOptions) {
    return (data, options) => {
        fetch(data[0], Object.assign({}, defaultOptions, data[1] || {}, options));
    };
}

function parse(data, options, self) {
    if (Array.isArray(data)) {
        return generateFetch(data, options).bind(self);
    } else if (Object(data) === data) {
        return Object.keys(data).reduce((accumulator, k) => {
            return Object.assign(accumulator, {
                [k]: parse(data[k], options, self),
            });
        }, {});
    } else {
        return data;
    }
}

export default class Api {
    constructor(config, options) {
        return parse(config, options, this);
    }
}
