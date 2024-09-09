import Application from "../Models/application.model.js";  // Changed to default import for Application model
import job from "../Models/job.model.js";

// Create a new application
export const CreateApplication = async (req, res) => {
    try {
        const applicantId = req.id;  // Use camelCase consistently
        const jobId = req.params.id;

        // Check if the user has already applied for this job
        const existingApplication = await Application.findOne({ job: jobId, applicants: applicantId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job.",
                success: false  // Fixed typo "sucess" to "success"
            });
        }

        const jobExist = await job.findById(jobId);

        if (!jobExist) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicants: applicantId
        });

        // Update the job's applications array
        jobExist.applications.push(newApplication._id);
        await jobExist.save();  // Save the job with the updated applications array

        return res.status(201).json({
            newApplication,
            message: "Job applied successfully",
            success: true
        });

    } catch (error) {
        console.log("Error in createApplication function:", error);
        return res.status(500).json({  // Use 500 for internal server error
            message: "Internal server error",
            success: false
        });
    }
};

// Get all jobs that a user has applied for
export const getAppliedJob = async (req, res) => {
    try {
        const userId = req.id;

        const appliedJobs = await Application.find({ applicants: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                populate: {
                    path: "company",  // Populating company within job
                    options: { sort: { createdAt: -1 } }
                }
            });

        if (!appliedJobs.length) {  // Check if appliedJobs array is empty
            return res.status(400).json({
                message: "No applied jobs found",
                success: false
            });
        }

        return res.status(200).json({
            appliedJobs,
            message: "Applied jobs retrieved successfully",
            success: true
        });

    } catch (error) {
        console.log("Error in getAppliedJob function:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// For admin to see applicants for a particular job
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            });
        }

        const JOB = await job.findById(jobId).populate({
            path: "Application",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicants"
            }
        })

        if (!JOB) {
            return res.status(400).json({

            })
        }



        if (!JOB) {  // Check if there are no applicants
            return res.status(404).json({
                message: "No applicants found for this job",
                success: false
            });
        }

        return res.status(200).json({
            JOB,
            message: "Applicants retrieved successfully",
            success: true
        });

    } catch (error) {
        console.log("Error in getApplicants function:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const updateSatus = async (req, res) => {
    const status = req.body;
    const jobId = req.params.id;

    const jobfind = job.findById(jobId).populate({
        path: 'applications'
    })

    if (!jobfind) {
        return res.status(400).json({
            message: "No job are found for you",
            success: false
        })
    }
}