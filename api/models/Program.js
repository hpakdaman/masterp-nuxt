import { Schema, model, models } from "mongoose";
// var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const ObjectId = Schema.ObjectId;

const ProgramSchema = new Schema({
  id: ObjectId,
  name: String,
});

// ProgramSchema.plugin(aggregatePaginate);
module.exports = models.Program || model("Program", ProgramSchema);
