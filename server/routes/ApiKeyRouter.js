import { Router } from "express";
import axios from "axios";
const router = new Router();

router.post("/", async (req, res) => {
  const cityName = req.body.city;
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: cityName,
          units: "Metric",
          appid: process.env.API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      stack: error.stack,
    });
  }
});

export default router;
