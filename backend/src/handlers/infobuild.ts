import type { RequestHandler } from "express";
import Building from "../models/building";

export const infobuild: RequestHandler = async (_, res) => {
  console.log("?????????????");
  const buildings = [1];//await Building.BuildingModel.find({}).exec();

  console.log(buildings);

  if (buildings) {
    res.json({ success: true, buildings });
  } else {
    res.json({ success: false });
  }
};
