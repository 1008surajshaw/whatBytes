import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes"
import sequelize from "../src/config/database"; 
import patientRoutes from "./routes/patientRoutes"
import doctorRoutes from "./routes/doctorRoutes"
import mappingRoutes from "./routes/mappingRoutes"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/patients", patientRoutes)
app.use("/api/doctors", doctorRoutes)
app.use("/api/mappings", mappingRoutes)

// Database connection test and server start
async function startServer() {
  try {
    await sequelize.authenticate()
    console.log("Database connection has been established successfully.")

    await sequelize.sync()
    console.log("Database synchronized")

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

startServer()

