import express from "express";
const app = express();
import fs, { readFileSync } from "fs";

//for mongoDb connection
import connectMongoDb from "./models/connection.js";
connectMongoDb("mongodb://localhost:27017/Backend-Practice");

//Import models
import productModel from "./models/productSchema.js";

const rawData = fs.readFileSync("./MOCK_DATA.json");
const dataToInsert = JSON.parse(rawData);

const insertProduct = async () => {
  console.log("am in insertProducts");
  productModel.insertOne({
    productName: "Watch",
    productDescription: "sfjndsfnmsd",
    productPrice: 1255,
    stock: 100,
  });
};

const insertProducts = async () => {
  console.log("am in insertProducts");
  console.log("data to insert: ",dataToInsert);
  productModel.insertMany(dataToInsert);
};



insertProducts();

app.listen(3000, () => {
  console.log("Server is running on PORT: ", 3000);
});
