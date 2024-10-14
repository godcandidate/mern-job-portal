import mongoose, { Document, Model, Schema } from "mongoose";

interface IJob extends Document {
    companyName: string;
    jobTitle: string;
    companyLogo: string;
    minPrice: number;
    maxPrice: number;
    salaryType: string;
    jobLocation: string;
    postingDate: string;
    experienceLevel: string;
    employmentType: string;
    description: string;
    user: object;
}

const jobSchema = new Schema<IJob>({
    companyName: String,
    jobTitle: String,
    companyLogo: String,
    minPrice: Number,
    maxPrice: Number,
    salaryType: String,
    jobLocation: String,
    postingDate: String,
    experienceLevel: String,
    employmentType: String,
    description: String,
    user: Object
})

const JobModel: Model<IJob> = mongoose.model("Job", jobSchema);
export default JobModel;