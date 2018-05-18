"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = require("great-logs");
function handlerDecorator(target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = (req, res) => {
        try {
            const response = originalMethod(req, res);
            if (response && typeof response.catch === 'function') {
                response.catch((error) => {
                    log.error(error);
                    req.errorFunction(res, 500, req.serverErrorMessage);
                });
            }
            return response;
        }
        catch (error) {
            log.error(error);
            req.errorFunction(res, 500, req.serverErrorMessage);
        }
        return;
    };
    return descriptor;
}
exports.handlerDecorator = handlerDecorator;
