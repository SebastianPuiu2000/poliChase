import { Schema } from "mongoose";
import { Document, Model } from "mongoose";
import { model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  name: string;
  email: string;
  password: string;
  score: number;
  color: string;
}
export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  score: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  }
});

const UserModel = model<IUserDocument>("user", UserSchema);

const createUser = async (
  name: string,
  email: string,
  password: string,
  score: number,
  color: string
) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return UserModel.create({
    name: name,
    email: email,
    password: hash,
    score: score,
    color: color
  });
};

const increaseScore = async (query: any, value: number) => {
  await UserModel.updateMany(query, { $inc: { score: value } });
}

export default { UserModel, methods: { createUser, increaseScore } };
