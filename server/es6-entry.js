//Script to load the ESM module before the rest of the server code.
//Allows NodeJS to utilize 'import' statements in place of the CommonJS 'require()'

require = require("esm")(module /*, options*/);
module.exports = require("./index.js");
