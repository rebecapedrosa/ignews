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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
exports.saveSubscription = void 0;
var fauna_1 = require("../../../services/fauna");
var faunadb_1 = require("faunadb");
var stripe_1 = require("../../../services/stripe");
function saveSubscription(subscriptionId, customerId, createdAction) {
    if (createdAction === void 0) { createdAction = false; }
    return __awaiter(this, void 0, void 0, function () {
        var userRef, subscription, subscriptionData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fauna_1.fauna.query(faunadb_1.query.Select("ref", faunadb_1.query.Get(faunadb_1.query.Match(faunadb_1.query.Index("user_by_stripe_customer_id"), customerId))))];
                case 1:
                    userRef = _a.sent();
                    return [4 /*yield*/, stripe_1.stripe.subscriptions.retrieve(subscriptionId)];
                case 2:
                    subscription = _a.sent();
                    subscriptionData = {
                        id: subscription.id,
                        userId: userRef,
                        status: subscription.status,
                        price_id: subscription.items.data[0].price.id
                    };
                    if (!createdAction) return [3 /*break*/, 4];
                    return [4 /*yield*/, fauna_1.fauna.query(faunadb_1.query.Create(faunadb_1.query.Collection("subscriptions"), { data: subscriptionData }))];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, fauna_1.fauna.query(faunadb_1.query.Replace(faunadb_1.query.Select("ref", faunadb_1.query.Get(faunadb_1.query.Match(faunadb_1.query.Index("subscription_by_id"), subscriptionId))), { data: subscriptionData }))];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.saveSubscription = saveSubscription;
