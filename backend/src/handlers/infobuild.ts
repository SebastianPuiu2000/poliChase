import type { RequestHandler } from "express";
import Building from "../models/building";
import { getToken, verify } from "../jwt";
import { JwtPayload } from "jsonwebtoken";

export const infobuild: RequestHandler = async (_, res) => {
  const buildings = await Building.BuildingModel.find({}).exec();

  if (buildings) {
    res.json({ success: true, buildings });
  } else {
    res.json({ success: false });
  }
};
