"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateRequest;
function validateRequest(req, next, schema) {
    var options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown properties
        stripUnknown: true // remove unknown properties
    };
    var _a = schema.validate(req.body, options), error = _a.error, value = _a.value;
    if (error) {
        next(new Error("Validation error: ".concat(error.details.map(function (x) { return x.message; }).join(", "))));
    }
    else {
        req.body = value;
        next();
    }
}
