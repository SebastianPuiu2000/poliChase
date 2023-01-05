import type { RequestHandler } from "express";
import User from "../models/user";
import { getToken, verify } from "../jwt";
import { JwtPayload } from "jsonwebtoken";

export const info: RequestHandler = async (req, res) => {

  const token = getToken(req.url);

    if (!token) return res.json({ success: false });

    let payload: JwtPayload;
    try {
      payload = verify(token);
    } catch (e) {
        return res.json({ success: false });
    }

  const user = await User.UserModel.findOne({ _id: payload.id }, { password: 0, _id: 0}).exec();

  if (user) {
    res.json({ success: true, user});
  } else {
    res.json({ success: false });
  }
};
