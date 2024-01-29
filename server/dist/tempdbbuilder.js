"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var dbController_1 = require("./src/dbController");
var db = Array.from({ length: 100 }).map(function (_, i) { return ({
    id: (0, uuid_1.v4)(),
    imageUrl: "https://source.unsplash.com/200x150/?nature/".concat(i),
    price: 1000 + Math.floor(Math.random() * 20) * 500,
    title: "\uC784\uC2DC\uC0C1\uD488".concat(i),
    description: "\uC784\uC2DC\uC0C1\uC138\uB0B4\uC6A9".concat(i),
    createdAt: 1642424841540 + 1000 * 60 * 60 * 5 * i,
}); });
(0, dbController_1.writeDB)(dbController_1.DBField.PRODUCTS, db);
