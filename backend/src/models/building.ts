import { Schema } from "mongoose";
import { Document, Model } from "mongoose";
import { model } from "mongoose";

export interface IBuilding {
  name: string;
  color: Array<number>;
  points: Array<[number, number]>;
}

export interface IBuildingDocument extends IBuilding, Document {}
export interface IBuildingModel extends Model<IBuildingDocument> {}

const BuildingSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  color: {
    type: [Number],
    required: true,
  },
  points: {
    type: [[Number]],
    required: true,
  },
});

const BuildingModel = model<IBuildingDocument>("building", BuildingSchema);

const createBuilding = async (
  name: string,
  color: Array<number>,
  points: Array<[number, number]>
) => {
  return BuildingModel.create({
    name: name,
    color: color,
    points: points,
  });
};

export default { BuildingModel, methods: { createBuilding } };
