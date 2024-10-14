import express from "express";
import { uploadJob } from "../controllers/job.controller";

const router = express.Router();

//Job routes
router.post("/post-job", uploadJob);

export default router;