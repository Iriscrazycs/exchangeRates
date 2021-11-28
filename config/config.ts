import * as dotenv from 'dotenv';
var admin = require("firebase-admin");
dotenv.config();

var serviceAccount = require("/home/wenyang/Downloads/lemonTree/password/account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

const db=admin.firestore();
const CurrencyRate=db.collection("Currency")

module.exports=CurrencyRate;