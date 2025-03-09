"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    if (typeof err === "string") {
        // Custom application error
        var is404 = err.toLowerCase().endsWith("not found");
        var statusCode = is404 ? 404 : 400;
        return res.status(statusCode).json({ message: err });
    }
    return res.status(500).json({ message: err.message || "Internal Server Error" });
}
