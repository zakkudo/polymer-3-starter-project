module.exports = {
    "extends": [
        "google",
        "plugin:import/errors"
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
