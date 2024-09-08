import { job, job } from "../Models/job.model";

export const CreateJob = async (req, res) => {

    try {
        const { title, description, requirements, sallary, location, jobType, expriance, opening, CompanyId } = req.body
        const userId = req.id
        if (!title || !description || !requirements || !sallary || !location || !opening || !CompanyId || !expriance) {
            return res.status(400).json({
                message: "Somthing is Missing",
                sucess: false
            })
        }
        const job = job.create({
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
        })

        return res.status(200).json({
            job,
            message: "job created sucessfully",
            sucess: true
        })


    } catch (error) {
        console.log("error occur in job creation", error)
        return res.status(400).json({
            message: "internal server error",
            sucess: false
        })
    }

}

export const getAllJob = async (req, res) => {

    try {
        const keyword = req.params.keyword;
        const querry = {
            $or: [

                { "title": { $regax: keyword, Option: "i" } },
                { "description": { $regax: keyword, Option: "i" } }

            ]
        }

        const jobs = job.find(querry).populate('ti');
        if (!jobs) {
            return res.status(404).json({
                message: "job are not found",
                sucess: false
            })
        }
        return res.status(200).json({
            jobs,
            sucess: true
        })
    } catch (error) {
        console.log("error in get all job")
        return res.status(404).json({
            message: "inetrnal server error",
            sucess: false
        })
    }
}

export const getJobById = async (req, res) => {

    try {
        const jobid = req.params.id
        const job = await job.findById(jobid);

        if (!job) {
            return res.status(404).json(
                {
                    message: "job is not found",
                    sucess: false
                }
            )
        }

        return res.status(200).json({
            job,
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