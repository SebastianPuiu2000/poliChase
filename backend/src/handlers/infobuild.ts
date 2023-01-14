import type { RequestHandler } from "express";
import Building from "../models/building";

export const infobuild: RequestHandler = async (_, res) => {
  const buildings = (await Building.BuildingModel.find({}).exec()).map(
    build => ({ name: build.name, color: build.color, points: build.points })
  );

  if (buildings) {
    res.json({ success: true, buildings });
  } else {
    res.json({ success: false });
  }
};
