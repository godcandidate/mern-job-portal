import express from "express";
import { editJob, getAllJobs, getSingleJob, uploadJob } from "../controllers/job.controller";
import { activateUser, loginUser, logoutUser, registerUser, updateAccessToken } from "../controllers/user.controller";
import { isAuthenticated } from "../utils/auth";

const router = express.Router();

//users
router.post("/registration", registerUser);
router.post("/activate-user", activateUser);
router.post("/login-user", loginUser);
router.post("/logout", isAuthenticated, logoutUser);
router.post("/refresh", updateAccessToken);

//Job routes
router.post("/post-job", uploadJob);
router.get("/all-jobs", getAllJobs);
router.get("/jobs/:id", getSingleJob);
router.put("/jobs/:id", editJob);

export default router;