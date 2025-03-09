"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var user_entity_js_1 = require("../users/user.entity.js"); 
var config_json_1 = __importDefault(require("../../config.json"));
var _a = config_json_1.default.database, host = _a.host, port = _a.port, user = _a.user, password = _a.password, database = _a.database;
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: host,
    port: Number(port),
    username: user,
    password: password,
    database: database,
    synchronize: true,
    logging: false,
    entities: [user_entity_js_1.User],
});
