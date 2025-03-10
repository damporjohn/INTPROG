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
exports.UserService = void 0;
var user_entity_1 = require("./user.entity");
var data_source_1 = require("../_helpers/data-source");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var UserService = /** @class */ (function () {
    function UserService() {
        this.userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    }
    UserService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userRepository.find({
                        select: ["id", "email", "title", "firstName", "lastName", "role"],
                    })];
            });
        });
    };
    UserService.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userRepository.findOneBy({ id: id })];
            });
        });
    };
    UserService.prototype.create = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var existingUser, user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOneBy({ email: params.email })];
                    case 1:
                        existingUser = _b.sent();
                        if (existingUser) {
                            throw new Error("Email \"".concat(params.email, "\" is already registered"));
                        }
                        user = this.userRepository.create(params);
                        // Confirm 'passwordHash' exists in User entity
                        _a = user;
                        return [4 /*yield*/, bcryptjs_1.default.hash(params.password, 10)];
                    case 2:
                        // Confirm 'passwordHash' exists in User entity
                        _a.passwordHash = _b.sent();
                        return [2 /*return*/, this.userRepository.save(user)];
                }
            });
        });
    };
    UserService.prototype.update = function (id, params) {
        return __awaiter(this, void 0, void 0, function () {
            var user, emailTaken, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getById(id)];
                    case 1:
                        user = _b.sent();
                        if (!user)
                            throw new Error("User not found");
                        if (!(params.email && params.email !== user.email)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userRepository.findOneBy({ email: params.email })];
                    case 2:
                        emailTaken = _b.sent();
                        if (emailTaken)
                            throw new Error("Email \"".concat(params.email, "\" is already taken"));
                        _b.label = 3;
                    case 3:
                        if (!params.password) return [3 /*break*/, 5];
                        _a = params;
                        return [4 /*yield*/, bcryptjs_1.default.hash(params.password, 10)];
                    case 4:
                        _a.passwordHash = _b.sent();
                        _b.label = 5;
                    case 5:
                        Object.assign(user, params);
                        return [2 /*return*/, this.userRepository.save(user)];
                }
            });
        });
    };
    UserService.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new Error("User not found");
                        return [2 /*return*/, this.userRepository.remove(user)];
                }
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
