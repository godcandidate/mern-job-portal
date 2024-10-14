import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import JobModel from "../models/job.model";

//Upload a job
export const uploadJob = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobData = req.body;
      
        const job = await JobModel.create(jobData);
      
        res.status(200).json({
          success: true,
          message: 'Job created successfully'
        });
      
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get all jobs
export const getAllJobs = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {      
        const jobs = await JobModel.find();

        res.status(200).json({
          success: true,
          jobs
        });
      
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


//get a single a job
export const getSingleJob = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {      
        const job_id = req.params.id;

        const job = await JobModel.findById(job_id)

        res.status(200).json({
          success: true,
          job
        });
      
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);




// edit course
export const editJob = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobData = req.body;
      
      const jobId = req.params.id;

      const course = await JobModel.findByIdAndUpdate(
        jobId,
        { $set: jobData },
        { new: true }
      );

      res.status(201).json({
        success: true,
        jobData,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
