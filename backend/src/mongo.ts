import mongoose from "mongoose";

export const connectMongo = () => {
  return new Promise(resolve => {
    mongoose.connect("mongodb://localhost:27017/users", () => {
      console.log("connected to mongo");
      resolve(null);
    });
  });
};
