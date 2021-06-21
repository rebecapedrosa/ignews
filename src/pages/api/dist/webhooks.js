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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
exports.config = void 0;
var stripe_1 = require("../../services/stripe");
var manageSubscription_1 = require("./_lib/manageSubscription");
function buffer(readable) {
    var readable_1, readable_1_1;
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var chunks, chunk, e_1_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    chunks = [];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    readable_1 = __asyncValues(readable);
                    _b.label = 2;
                case 2: return [4 /*yield*/, readable_1.next()];
                case 3:
                    if (!(readable_1_1 = _b.sent(), !readable_1_1.done)) return [3 /*break*/, 5];
                    chunk = readable_1_1.value;
                    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(readable_1_1 && !readable_1_1.done && (_a = readable_1["return"]))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(readable_1)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/, Buffer.concat(chunks)];
            }
        });
    });
}
exports.config = {
    api: {
        bodyParser: false
    }
};
var relevantEvents = new Set([
    "checkout.session.completed",
    "customer.subscription.updated",
    "customer.subscription.deleted"
]);
exports["default"] = (function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var buf, secret, event, type, _a, subscription, checkoutSession, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(req.method === "POST")) return [3 /*break*/, 11];
                return [4 /*yield*/, buffer(req)];
            case 1:
                buf = _b.sent();
                secret = req.headers["stripe-signature"];
                event = void 0;
                try {
                    event = stripe_1.stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET);
                }
                catch (err) {
                    return [2 /*return*/, res.status(400).send("Webhook error: " + err.message)];
                }
                type = event.type;
                if (!relevantEvents.has(type)) return [3 /*break*/, 10];
                _b.label = 2;
            case 2:
                _b.trys.push([2, 9, , 10]);
                _a = type;
                switch (_a) {
                    case "customer.subscription.updated": return [3 /*break*/, 3];
                    case "customer.subscription.deleted": return [3 /*break*/, 3];
                    case "checkout.session.completed": return [3 /*break*/, 5];
                }
                return [3 /*break*/, 7];
            case 3:
                subscription = event.data.object;
                console.log({ subscription: subscription });
                return [4 /*yield*/, manageSubscription_1.saveSubscription(subscription.id, subscription.customer.toString(), false)];
            case 4:
                _b.sent();
                return [3 /*break*/, 8];
            case 5:
                checkoutSession = event.data
                    .object;
                return [4 /*yield*/, manageSubscription_1.saveSubscription(checkoutSession.subscription.toString(), checkoutSession.customer.toString(), true)];
            case 6:
                _b.sent();
                return [3 /*break*/, 8];
            case 7: throw new Error("Unhandled event.");
            case 8: return [3 /*break*/, 10];
            case 9:
                err_1 = _b.sent();
                return [2 /*return*/, res.json({ error: "Webhook handler failed" })];
            case 10:
                res.json({ received: true });
                return [3 /*break*/, 12];
            case 11:
                res.setHeader("Allow", "POST");
                res.status(405).end("Method not allowed");
                _b.label = 12;
            case 12: return [2 /*return*/];
        }
    });
}); });
