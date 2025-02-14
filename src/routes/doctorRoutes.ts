import {authenticate} from "../middleware/authMiddleware"
const express =require("express")
const { addDoctor, getDoctors, getDoctor, updateDoctor, deleteDoctor } = require("../controllers/doctorController")

const router = express.Router()


router.post("/create",authenticate, addDoctor)
router.get("/", getDoctors)
router.get("/:id", getDoctor)
router.put("/:id", updateDoctor)
router.delete("/:id", deleteDoctor)

export default router

