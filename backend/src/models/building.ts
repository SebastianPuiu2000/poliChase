import { Schema } from "mongoose";
import { Document, Model } from "mongoose";
import { model } from "mongoose";
import bcrypt from "bcrypt";

export interface IBuilding {
    name: string;
    points: [{
        lat: number,
        lon: number
    }]
}

export interface IBuildingDocument extends IBuilding, Document {}
export interface IBuildingModel extends Model<IBuildingDocument> {}

const BuildingSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }, 
    points: {
        type: [{
            lat: Number,
            lon: Number
        }],
        required: true
    }
});

const BuildingModel = model<IBuildingDocument>("building", BuildingSchema);

const createBuilding = async (
  name: string,
  points: [{
    lat: number,
    lon: number
  }]
) => {
  return BuildingModel.create({
    name: name,
    points: points
  });
};

export default { BuildingModel, methods: { createBuilding } };
