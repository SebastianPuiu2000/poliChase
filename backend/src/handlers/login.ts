import type { RequestHandler } from "express";
import User from "../models/user";
import { sign } from "../jwt";
import bcrypt from "bcrypt";

export const login: RequestHandler = async (req, res) => {
  let record = req.body;

  const user = await User.UserModel.findOne({ name: record["name"] }).exec();

  if (user) {
    bcrypt.compare(record["password"], user.password, (_, result) => {
      if (result) {
        const token = sign(user["_id"], user["name"], user["email"]);

        res.json({ success: true, token });
      } else {
        res.json({ success: false });
      }
    });
  } else {
    res.json({ success: false });
  }
};
