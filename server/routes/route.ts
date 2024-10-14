import express from "express";
import { getAllJobs, uploadJob } from "../controllers/job.controller";

const router = express.Router();

//Job routes
router.post("/post-job", uploadJob);
router.get("/all-jobs", getAllJobs);

export default router;