import type { RequestHandler } from "express";
import User from "../models/user";
import { getToken, verify } from "../jwt";
import { JwtPayload } from "jsonwebtoken";

export const color: RequestHandler = async (req, res) => {
  const token = getToken(req.url);

  if (!token || !req.body.color) return res.json({ success: false });

  let payload: JwtPayload;
  try {
    payload = verify(token);
  } catch (e) {
    return res.json({ success: false });
  }

  var myquery = { _id: payload.id };
  var newvalue = { color: req.body.color };

  await User.UserModel.updateOne(myquery, newvalue).exec();

  return res.json({ success: true });
};
