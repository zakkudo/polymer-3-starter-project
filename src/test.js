const lib = require.context('./lib', true, /\.js$/);

lib.keys().forEach(lib);


const application = require.context('./Application', true, /\.js$/);

application.keys().forEach(application);
