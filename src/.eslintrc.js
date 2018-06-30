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
    "settings": {
        "import/resolver": "webpack"
    }
};
