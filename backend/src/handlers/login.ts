import type { RequestHandler } from "express"
import User from "../models/user"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

const jwtSecret: string = process.env.JWT_SECRET || "123456"
const tokenExpirationInSeconds = 36000

export const login: RequestHandler = async (req, res) => {
  let record = req.body;

  const user = await User.UserModel.findOne({ email: record['email'] }).exec();

  if (user) {
    bcrypt.compare(record['password'], user.password, function(err, result) {

      if (result) {
        const token = jwt.sign(record, jwtSecret, {
          expiresIn: tokenExpirationInSeconds
        })
        res.json({ success: true, data: user, token })
      }
      else {
        res.json({ success: false })
      }
    });

  } else {
    res.json({ success: false })
  }
}
