import type { RequestHandler } from "express"
import User from "../models/user"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

const jwtSecret: string = process.env.JWT_SECRET || "123456"
const tokenExpirationInSeconds = 36000

export const login: RequestHandler = async (req, res) => {
  let record = req.body;

  const user = await User.UserModel.findOne({ name: record['name'] }).exec();

  if (user) {
    bcrypt.compare(record['password'], user.password, (_, result) => {
      if (result) {
        const token = jwt.sign({ id: user['_id'], name: user['name'], email: user['email'] }, jwtSecret, {
          expiresIn: tokenExpirationInSeconds
        })
        res.json({ success: true, token })
      }
      else {
        res.json({ success: false })
      }
    });

  } else {
    res.json({ success: false })
  }
}
