"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../lib/router");
const chai_1 = require("chai");
describe('word parser', () => {
    let appRouter;
    beforeEach(() => {
        appRouter = new router_1.BasicRoutes();
    });
    it('initializes', () => {
        chai_1.expect(appRouter.basePath).to.equal('');
        chai_1.expect(appRouter.templatePath).to.equal('');
    });
});
