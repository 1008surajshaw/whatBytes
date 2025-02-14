import { authenticate } from "../middleware/authMiddleware"

const express =require("express")
const {
  assignDoctorToPatient,
  getMappings,
  getDoctorsForPatient,
  removeMapping,
  getPatientForDoctor,
  updateMapping

}  =  require("../controllers/mappingController")

const router = express.Router()


router.post("/",authenticate, assignDoctorToPatient)
router.get("/", getMappings)
router.get("/patient/:patientId", getDoctorsForPatient)
router.get("/doctor/:doctorId",getPatientForDoctor )
router.put("/update/:mappingId",updateMapping )

router.delete("/:mappingId", removeMapping)

export default router

