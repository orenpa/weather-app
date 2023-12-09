import csv from "csv-parser";
import City from "../models/City.js";
import fs from "fs";
import { log } from "console";

let result = [];
const csvFilePath = "./data/worldcities.csv";
const setCitiesDB = () => {
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (data) => result.push(data))
    .on("end", () => insertCities(result));
};

//uploading cities to mongoDB
async function insertCities(cities) {
  try {
    const count = await City.countDocuments({});
    if (count === 0) {
      await City.insertMany(cities.map((city) => ({ name: city.city })));
      console.log("Initial cities db = GOOD");
    }
  } catch (err) {
    console.error("Failed to initialize cities:", err);
  }
}

export default setCitiesDB;
