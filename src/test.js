const lib = require.context('./lib', true, /\.js$/);

function filter(k) {
    return !k.endsWith('story.js');
}

lib.keys().filter(filter).forEach(lib);

const application = require.context('./Application', true, /\.js$/);

application.keys().filter(filter).forEach(application);
