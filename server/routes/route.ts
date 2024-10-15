import express from "express";
import { editJob, getAllJobs, getSingleJob, uploadJob } from "../controllers/job.controller";
import { activateUser, loginUser, registerUser } from "../controllers/user.controller";

const router = express.Router();

//users
router.post("/registration", registerUser);
router.post("/activate-user", activateUser);
router.post("/login-user", loginUser);

//Job routes
router.post("/post-job", uploadJob);
router.get("/all-jobs", getAllJobs);
router.get("/jobs/:id", getSingleJob);
router.put("/jobs/:id", editJob);

export default router;