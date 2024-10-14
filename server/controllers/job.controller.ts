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