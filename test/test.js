var should = require('should');

var evcheck = require('../lib/evcheck');

describe('evcheck', function() {

    beforeEach(function() {
        process.env.TEST_VAR = 'test';
        process.env.TEST_VAR_2 = 'test 2';
    });

    describe('#checkVars()', function() {
        it('should throw error if first argument is not an Array', function() {
            evcheck.checkVars.should.throw();
        });
        it('should call back without error when requested variables are provided', function() {
            var result = function(err) {
                should.not.exist(err);
            };

            evcheck.checkVars(['TEST_VAR', 'TEST_VAR_2'], result);
        });
        it('should call back with error object containing a message and every variable which was not set', function() {
            var nonExistingVar = 'NON_EXISTING_VAR';
            var nonExistingVar2 = 'NON_EXISTING_VAR';
            var existingVar = 'TEST_VAR';
            var existingVar2 = 'TEST_VAR_2';

            var result = function(err) {
                should.exist(err);
                err.message.should.not.be.empty;
                err.variables.should.containEql(nonExistingVar);
                err.variables.should.containEql(nonExistingVar2);
                err.variables.should.not.containEql(existingVar);
                err.variables.should.not.containEql(existingVar2);
            };

            evcheck.checkVars([existingVar, nonExistingVar, existingVar2, nonExistingVar2], result);
        });
    });

});
