var util = require('util');

/**
 * Checks whether required environemnt variables are provided.
 *
 * @param  {Array} variableNames - variable names to check
 * @param  {callback} callback - callback function. Returns error object with message and a collection of unset variable names.
 */
module.exports.checkVars = function checkVars(variableNames, callback) {
    if (Object.prototype.toString.call(variableNames) !== '[object Array]') {
        throw new Error('variableNames parameter must must be of type Array');
    }

    var envars = process.env;

    var unsetVars = [];

    variableNames.forEach(function(varname) {
        if (!envars.hasOwnProperty(varname)) {
            unsetVars.push(varname);
        }
    });

    if (unsetVars.length) {
        callback({
            message: util.format('Unset variable(s): %s', unsetVars.join(', ')),
            variables: unsetVars
        });
    } else {
        callback();
    }

};
