const nconf = require('nconf');

nconf.argv();
nconf.env();
nconf.file({
    file: './config/config.json',
    logicalSeparator: '.'
});

module.exports = nconf;
