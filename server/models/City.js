import mongoose, { Mongoose } from "mongoose";

const citySchema = new mongoose.Schema({
  name: String,
});

const City = mongoose.model("City", citySchema);

export default City;
