"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_1 = require("../../firebase");
var firestore_1 = require("firebase/firestore");
var cartResolver = {
    Query: {
        cart: function (parent, args) { return __awaiter(void 0, void 0, void 0, function () {
            var cart, cartSnap, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cart = (0, firestore_1.collection)(firebase_1.db, "cart");
                        return [4 /*yield*/, (0, firestore_1.getDocs)(cart)];
                    case 1:
                        cartSnap = _a.sent();
                        data = [];
                        cartSnap.forEach(function (doc) {
                            var d = doc.data();
                            data.push(__assign({ id: doc.id }, d));
                        });
                        return [2 /*return*/, data];
                }
            });
        }); },
    },
    Mutation: {
        addCart: function (parent, _a) {
            var productId = _a.productId;
            return __awaiter(void 0, void 0, void 0, function () {
                var productRef, cartCollection, exist, cartRef, cartSnapshot;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!productId)
                                throw Error("상품id가 없다!");
                            productRef = (0, firestore_1.doc)(firebase_1.db, "products", productId);
                            cartCollection = (0, firestore_1.collection)(firebase_1.db, "cart");
                            return [4 /*yield*/, (0, firestore_1.getDocs)((0, firestore_1.query)(cartCollection, (0, firestore_1.where)("product", "==", productRef)))];
                        case 1:
                            exist = (_b.sent()).docs[0];
                            if (!exist) return [3 /*break*/, 3];
                            // 3️⃣ 번
                            cartRef = (0, firestore_1.doc)(firebase_1.db, "cart", exist.id);
                            return [4 /*yield*/, (0, firestore_1.updateDoc)(cartRef, {
                                    amount: (0, firestore_1.increment)(1),
                                })];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, (0, firestore_1.addDoc)(cartCollection, {
                                amount: 1,
                                product: productRef,
                            })];
                        case 4:
                            // 4️⃣ 번
                            cartRef = _b.sent();
                            _b.label = 5;
                        case 5: return [4 /*yield*/, (0, firestore_1.getDoc)(cartRef)];
                        case 6:
                            cartSnapshot = _b.sent();
                            return [2 /*return*/, __assign(__assign({}, cartSnapshot.data()), { product: productRef, id: cartSnapshot.id })];
                    }
                });
            });
        },
        updateCart: function (parent, _a) {
            var cartId = _a.cartId, amount = _a.amount;
            return __awaiter(void 0, void 0, void 0, function () {
                var cartRef, cartSnapshot;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (amount < 1)
                                throw Error("1 이하로 바꿀 수 없습니다.");
                            cartRef = (0, firestore_1.doc)(firebase_1.db, "cart", cartId);
                            if (!cartRef)
                                throw Error("장바구니 정보가 없다!");
                            return [4 /*yield*/, (0, firestore_1.updateDoc)(cartRef, {
                                    amount: amount,
                                })];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, (0, firestore_1.getDoc)(cartRef)];
                        case 2:
                            cartSnapshot = _b.sent();
                            return [2 /*return*/, __assign(__assign({}, cartSnapshot.data()), { id: cartSnapshot.id })];
                    }
                });
            });
        },
        deleteCart: function (parent, _a) {
            var cartId = _a.cartId;
            return __awaiter(void 0, void 0, void 0, function () {
                var cartRef;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            cartRef = (0, firestore_1.doc)(firebase_1.db, "cart", cartId);
                            if (!cartRef)
                                throw new Error("장바구니 정보가 없습니다");
                            return [4 /*yield*/, (0, firestore_1.deleteDoc)(cartRef)];
                        case 1:
                            _b.sent();
                            return [2 /*return*/, cartId];
                    }
                });
            });
        },
        executePay: function (parent, _a) {
            var _b, ids_1, ids_1_1;
            var ids = _a.ids;
            return __awaiter(void 0, void 0, void 0, function () {
                var deleted, id, cartRef, cartSnapshot, cartData, productRef, product, e_1_1;
                var _c, e_1, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            deleted = [];
                            _f.label = 1;
                        case 1:
                            _f.trys.push([1, 9, 10, 15]);
                            _b = true, ids_1 = __asyncValues(ids);
                            _f.label = 2;
                        case 2: return [4 /*yield*/, ids_1.next()];
                        case 3:
                            if (!(ids_1_1 = _f.sent(), _c = ids_1_1.done, !_c)) return [3 /*break*/, 8];
                            _e = ids_1_1.value;
                            _b = false;
                            id = _e;
                            cartRef = (0, firestore_1.doc)(firebase_1.db, "cart", id);
                            return [4 /*yield*/, (0, firestore_1.getDoc)(cartRef)];
                        case 4:
                            cartSnapshot = _f.sent();
                            cartData = cartSnapshot.data();
                            productRef = cartData === null || cartData === void 0 ? void 0 : cartData.product;
                            if (!productRef)
                                throw Error("상품정보가 없다.");
                            return [4 /*yield*/, (0, firestore_1.getDoc)(productRef)];
                        case 5:
                            product = (_f.sent()).data();
                            if (!product.createdAt) return [3 /*break*/, 7];
                            return [4 /*yield*/, (0, firestore_1.deleteDoc)(cartRef)];
                        case 6:
                            _f.sent();
                            deleted.push(id);
                            _f.label = 7;
                        case 7:
                            _b = true;
                            return [3 /*break*/, 2];
                        case 8: return [3 /*break*/, 15];
                        case 9:
                            e_1_1 = _f.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 15];
                        case 10:
                            _f.trys.push([10, , 13, 14]);
                            if (!(!_b && !_c && (_d = ids_1.return))) return [3 /*break*/, 12];
                            return [4 /*yield*/, _d.call(ids_1)];
                        case 11:
                            _f.sent();
                            _f.label = 12;
                        case 12: return [3 /*break*/, 14];
                        case 13:
                            if (e_1) throw e_1.error;
                            return [7 /*endfinally*/];
                        case 14: return [7 /*endfinally*/];
                        case 15: return [2 /*return*/, deleted];
                    }
                });
            });
        },
    },
    CartItem: {
        product: function (cartItem, args) { return __awaiter(void 0, void 0, void 0, function () {
            var product, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, firestore_1.getDoc)(cartItem.product)];
                    case 1:
                        product = _a.sent();
                        data = product.data();
                        return [2 /*return*/, __assign(__assign({}, data), { id: product.id })];
                }
            });
        }); },
    },
};
exports.default = cartResolver;
