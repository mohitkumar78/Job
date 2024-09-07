import express from 'express'
import { RigisterCompany, getCompany, getCompanyById, findComapnyAndUpdate } from '../Controler/Company.js'
import { isAuthenticated } from '../Middleware/isAuthenticated.js'

const router = express.Router()

router.route("/register").post(isAuthenticated, RigisterCompany)
router.route("/get").get(isAuthenticated, getCompany)
router.route("/get/:id").get(isAuthenticated, getCompanyById)
router.route("/update/:id").put(isAuthenticated, findComapnyAndUpdate)

export default router;