import { Router } from "express";
import City from "../models/City.js";

//router object that will define routes
const router = Router();

router.get("/", async (req, res) => {
  try {
    const cities = await City.find({});
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
