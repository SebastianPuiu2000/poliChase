import type { RequestHandler } from "express";
import Sector from "../models/sector";

export const infobuild: RequestHandler = async (_, res) => {
  const sectors = await Sector.SectorModel.find({}).exec();

  if (sectors) {
    res.json({ success: true, sectors });
  } else {
    res.json({ success: false });
  }
};
