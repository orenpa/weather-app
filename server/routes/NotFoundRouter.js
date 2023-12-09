import { Router } from "express";

const router = new Router();

router.get("/", async (req, res) => {
  res.json({ message: "Error: Not Found" });
});

export default router;
