import express from 'express'
import { register } from '../Controler/RigsterUser.js'
import { login } from '../Controler/RigsterUser.js'
import { logout } from '../Controler/RigsterUser.js'
import { Updateuser } from '../Controler/RigsterUser.js'
import { isAuthenticated } from '../Middleware/isAuthenticated.js'
const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/profile/update").post(isAuthenticated, Updateuser)
router.route("/logout").post(logout)
export default router;