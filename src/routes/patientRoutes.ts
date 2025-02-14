import { authenticate } from "../middleware/authMiddleware"

const express =require("express")
const  { addPatient, getPatients, getPatient, updatePatient, deletePatient }  =  require("../controllers/patientController")

const router =express.Router()

router.post("/create",authenticate, addPatient)
router.get("/", getPatients)
router.get("/:id", getPatient)
router.put("/:id", updatePatient)
router.delete("/:id", deletePatient)

export default router

