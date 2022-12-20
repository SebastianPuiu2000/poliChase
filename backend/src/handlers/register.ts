import type { RequestHandler } from "express"
import user from "../models/user"

export const register: RequestHandler = async (req, res) => {
  let record = req.body;

  if (!record['name'] || !record['email'] || !record['password']) {
    return res.json({ success: false });
  }

  user.methods.createUser(record['name'], record['email'], record['password']);
  res.json({ success: true })
}
