"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib = require("../lib/utils");
var chai_1 = require("chai");
describe('word parser', function () {
    beforeEach(function () {
        // Set up before running tests.
    });
    it('initializes', function () {
        chai_1.expect(lib.appName).to.equal('tsm.name');
    });
});
