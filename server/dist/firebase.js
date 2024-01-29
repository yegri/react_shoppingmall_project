"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// Import the functions you need from the SDKs you need
var app_1 = require("firebase/app");
require("dotenv/config");
var firestore_1 = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCpqFA3Gfuj4UUkQNMURHl7hc2_UHM1PxE",
    authDomain: "feyegri-shop.firebaseapp.com",
    projectId: "feyegri-shop",
    storageBucket: "feyegri-shop.appspot.com",
    messagingSenderId: "486345380517",
    appId: "1:486345380517:web:4e62e68d399ca46093734c",
};
// Initialize Firebase
var app = (0, app_1.initializeApp)(firebaseConfig);
exports.default = app;
exports.db = (0, firestore_1.getFirestore)(app);
