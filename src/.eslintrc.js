module.exports = {
    "extends": [
        "plugin:polymer/polymer-2",
        "plugin:import/errors"
    ],
    "env": {
        "jasmine": true
    },
    "plugins": [
        "polymer",
        "jasmine"
    ],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        'max-len': ["error", { "code": 100, "comments": 120 }]
    },
    "settings": {
        "import/resolver": "webpack"
    }
};
