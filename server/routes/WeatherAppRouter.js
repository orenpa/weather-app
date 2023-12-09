import { Router } from "express";
import City from "../models/City.js";

//router object that will define routes
const router = Router();

router.get("/", async (req, res) => {
  try {
    const cities = await City.find({});
    if (cities) {
      res.json(cities);
    } else {
      res.status(404).json({ error: "cities not found" });
      // TODO Not Found component and a router to /NotFound here
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
