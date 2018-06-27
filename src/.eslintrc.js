module.exports = {
    "extends": [
        "plugin:polymer/polymer-2",
        "plugin:import/errors"
    ],
    "plugins": [
        "polymer"
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
