'use strict';

// no affection to avoid unused var lint error
require('chai').should();

var myLib = require('../src/js/scripts.js');

describe('fake test', function() {
    it('should be true', function() {
        myLib.should.not.equal(undefined);
    });
});
