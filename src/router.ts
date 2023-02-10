import { Router } from "express";

const router = Router();

router.get("/", (req, res) => res.json("running"));

export default router;