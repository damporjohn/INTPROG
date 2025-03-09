"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var data_source_1 = require("./_helpers/data-source");
var user_controller_1 = __importDefault(require("./users/user.controller"));
var error_handler_1 = __importDefault(require("./error-handler"));
var app = (0, express_1.default)(); // <-- Moved this to the top
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
data_source_1.AppDataSource.initialize()
    .then(function () {
    console.log("Database connected");
    app.use("/users", user_controller_1.default);
    app.use(error_handler_1.default); // Keep this at the end
    var port = process.env.PORT || 4000;
    app.listen(port, function () { return console.log("Server listening on port ".concat(port)); });
})
    .catch(function (error) { return console.error("Database connection failed", error); });
