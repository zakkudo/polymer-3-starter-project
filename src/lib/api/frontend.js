import ApiTree from 'lib/ApiTree';

export default new ApiTree('', {
    version: {
        /**
         * @property {Function} api.frontent.version.get
        */
        get: ['/version.js'],
    },
}, {
    headers: {
        'Content-Type': 'application/json',
    },
});

