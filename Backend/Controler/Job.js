

import job from "../Models/job.model.js";

export const CreateJob = async (req, res) => {
    try {
        const { title, description, requirements, sallary, location, jobType, expriance, opening, CompanyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !sallary || !location || !opening || !CompanyId || !expriance) {
            return res.status(400).json({
                message: "Something is Missing",
                success: false
            });
        }

        // Rename the local variable to something else (e.g., newJob)
        const newJob = await job.create({
            title,
            description,
            requirements: requirements.split(","),
            sallary,
            location,
            jobType,
            opening,
            expriance,
            company: CompanyId,
            createdBy: userId
        });

        return res.status(200).json({
            newJob,  // Use newJob instead of job here
            message: "Job created successfully",
            success: true
        });

    } catch (error) {
        console.log("Error occurred in job creation:", error);
        return res.status(400).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const getAllJob = async (req, res) => {
    try {
        const keyword = req.params.keyword || "";
        const query = {
            $or: [
                { "title": { $regex: keyword, $options: "i" } },  // Case-insensitive search for title
                { "description": { $regex: keyword, $options: "i" } }  // Case-insensitive search for description
            ]
        };

        const jobs = await job.find(query).populate('company');  // Assuming you want to populate the company field
        if (!jobs.length) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log("Error in get all job:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


export const getJobById = async (req, res) => {

    try {
        const jobid = req.params.id
        console.log(jobid)
        const job2 = await job.findById(jobid);

        if (!job2) {
            return res.status(404).json(
                {
                    message: "job is not found",
                    sucess: false
                }
            )
        }

        return res.status(200).json({
            job2,
            sucess: true

        })
    } catch (error) {
        console.log("error is occur in finding job", error)
        return res.status(404).json(
            {
                message: "internal server error",
                sucess: false
            }
        )
    }

}

export const adminjobs = async (req, res) => {
    const adminId = req.id
    const jobs = await job.find({ createdBy: adminId })

    if (!jobs) {
        return res.status(400).json({
            message: "opps no jobs are created",
            sucess: false
        })
    }

    return res.status(200).json({
        jobs,
        message: "jobs are fetched", sucess: true
    })
}