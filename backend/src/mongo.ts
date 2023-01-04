import mongoose from "mongoose";

export const connectMongo = () => {
  let host = process.env.MONGO || "localhost";
  return new Promise(resolve => {
    mongoose.connect(`mongodb://${host}:27017/users`, () => {
      console.log("connected to mongo");
      resolve(null);
    });
  });
};
