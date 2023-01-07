import type { RequestHandler } from "express";
import User from "../models/user";

export const register: RequestHandler = async (req, res) => {
  let record = req.body;
  let score = 0;
  let color = "green";

  if (
    !record["name"] ||
    !record["email"] ||
    !record["password"]
  ) {
    return res.json({ success: false });
  }

  try {
    let user = await User.methods.createUser(
      record["name"],
      record["email"],
      record["password"],
      score,
      color
    );

    if (user) {
      return res.json({ success: true });
    }
  } catch(e) {
    console.log(e);
  }

  res.json({ success: false });
};
