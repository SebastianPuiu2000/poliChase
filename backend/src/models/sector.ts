import { Schema } from "mongoose";
import { Document, Model } from "mongoose";
import { model } from "mongoose";

export interface ISector {
  name: string;
  points: [number, number];
}

export interface ISectorDocument extends ISector, Document {}
export interface ISectorModel extends Model<ISectorDocument> {}

const SectorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  points: {
    type: [Number],
    required: true,
  },
});

const SectorModel = model<ISectorDocument>("sector", SectorSchema);

const createSector = async (
  name: string,
  points: [number, number]
) => {
  return SectorModel.create({
    name: name,
    points: points,
  });
};

export default { SectorModel, methods: { createSector } };
