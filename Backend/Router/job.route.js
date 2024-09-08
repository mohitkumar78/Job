import express from "express"
import { CreateJob, getAllJob, getJobById, adminjobs } from "../Controler/Job.js"
import { isAuthenticated } from "../Middleware/isAuthenticated.js";

const router = express.Router();

router.route("/createjob").post(isAuthenticated, CreateJob);
router.route("/getalljob").get(isAuthenticated, getAllJob);
router.route("/getJobAdmin").get(isAuthenticated, adminjobs);
router.route("/getjobById/:id").get(isAuthenticated, getJobById);


export default router;