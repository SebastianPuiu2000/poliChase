import { Schema } from "mongoose";
import { Document, Model } from "mongoose";
import { model } from "mongoose";
import bcrypt from 'bcrypt';

///////
const Joi = require('joi');
///////

export interface IUser {
  name: string,
  email: string,
  password: string
}
export interface IUserDocument extends IUser, Document { }
export interface IUserModel extends Model<IUserDocument> { }

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
});

const UserModel = model<IUserDocument>("user", UserSchema);

const validateUser = (user: IUser) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };
  return Joi.validate(user, schema);
}

const createUser = (name: string, email: string, password: string) => {
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      UserModel.create({ name: name, email: email, password: hash })
    });
  });
}

exports.UserSchema = UserSchema;
exports.UserModel = UserModel;

export default { UserModel, methods: { createUser, validateUser } }
