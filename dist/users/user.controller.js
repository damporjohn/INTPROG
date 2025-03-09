"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_service_1 = require("./user.service");
var validate_request_1 = __importDefault(require("../../src/_middleware/validate-request"));
var role_1 = __importDefault(require("../_helpers/role"));
var joi_1 = __importDefault(require("joi"));
var router = (0, express_1.Router)();
var userService = new user_service_1.UserService();
// Routes
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createSchema, create);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);
exports.default = router;
// Controller functions
function getAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            userService
                .getAll()
                .then(function (users) { return res.json(users); })
                .catch(next);
            return [2 /*return*/];
        });
    });
}
function getById(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            userService
                .getById(Number(req.params.id))
                .then(function (user) { return (user ? res.json(user) : res.status(404).json({ message: "User not found" })); })
                .catch(next);
            return [2 /*return*/];
        });
    });
}
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            userService
                .create(req.body)
                .then(function () { return res.json({ message: "User created" }); })
                .catch(next);
            return [2 /*return*/];
        });
    });
}
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            userService
                .update(Number(req.params.id), req.body)
                .then(function () { return res.json({ message: "User updated" }); })
                .catch(next);
            return [2 /*return*/];
        });
    });
}
function _delete(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            userService
                .delete(Number(req.params.id))
                .then(function () { return res.json({ message: "User deleted" }); })
                .catch(next);
            return [2 /*return*/];
        });
    });
}
// Validation schemas
function createSchema(req, res, next) {
    var schema = joi_1.default.object({
        title: joi_1.default.string().required(),
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        role: joi_1.default.string().valid(role_1.default.Admin, role_1.default.User).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
        confirmPassword: joi_1.default.string().valid(joi_1.default.ref("password")).required(),
    });
    (0, validate_request_1.default)(req, next, schema);
}
function updateSchema(req, res, next) {
    var schema = joi_1.default.object({
        title: joi_1.default.string().optional(),
        firstName: joi_1.default.string().optional(),
        lastName: joi_1.default.string().optional(),
        role: joi_1.default.string().valid(role_1.default.Admin, role_1.default.User).optional(),
        email: joi_1.default.string().email().optional(),
        password: joi_1.default.string().min(6).optional(),
        confirmPassword: joi_1.default.string().valid(joi_1.default.ref("password")).optional(),
    }).with("password", "confirmPassword");
    (0, validate_request_1.default)(req, next, schema);
}
