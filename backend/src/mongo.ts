import mongoose from "mongoose";
import { addBuildings } from "./build";

export const connectMongo = () => {
  let host = process.env.MONGO || "localhost";
  return new Promise(resolve => {
    mongoose.connect(`mongodb://${host}:27017/users`, async () => {
      console.log("connected to mongo");
      await addBuildings();
      console.log("buildings added");
      resolve(null);
    });
  });
};
