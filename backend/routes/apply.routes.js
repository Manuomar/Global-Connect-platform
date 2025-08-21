// routes/applyRoutes.js
import express from "express";
import { createApplication } from "../controllers/apply.Controller.js";

const router = express.Router();

// POST /api/jobs
router.post("/apply", createApplication);

export default router;
