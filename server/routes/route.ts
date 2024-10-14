import express from "express";
import { editJob, getAllJobs, getSingleJob, uploadJob } from "../controllers/job.controller";

const router = express.Router();

//Job routes
router.post("/post-job", uploadJob);
router.get("/all-jobs", getAllJobs);
router.get("/jobs/:id", getSingleJob);
router.put("/jobs/:id", editJob);

export default router;