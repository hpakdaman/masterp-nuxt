import { Schema, model, models } from "mongoose";
const ObjectId = Schema.ObjectId;

const CountrySchema = new Schema({
  id: ObjectId,
  name: String,
});

module.exports = models.Country || model("Country", CountrySchema);