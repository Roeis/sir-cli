'use strict'

const path = require('path');
require('app-module-path').addPath(path.resolve(__dirname, '../../'));

const assert = require('assert');

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1, 2, 3].indexOf(4));
        });
    });
});

describe('Home', () => {
    describe('controller get', () => {
        it('mesage', () => {
            assert.ok(true);
        });
    });
});
