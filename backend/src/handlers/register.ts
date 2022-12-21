import type { RequestHandler } from "express"
import user from "../models/user"

export const register: RequestHandler = async (req, res) => {
  let record = req.body;

  if (!record['name'] || !record['email'] || !record['password'] || !record['coordinates']) {
    return res.json({ success: false });
  }

  user.methods.createUser(record['name'], record['email'], record['password'], record['coordinates']);
  res.json({ success: true })
}
