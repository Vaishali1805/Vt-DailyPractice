import mongoose from "mongoose";

export default async function connectMongoDb(url) {
    mongoose.connect(url)
    .then(() => {console.log("MongoDb connected")})
    .catch((error) => {console.error("Error in MongoDb connection: ",error)});
}