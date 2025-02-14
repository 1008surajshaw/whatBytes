import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"; // Import shared instance
import Patient from "./Patient";
import Doctor from "./Docters"; // Ensure correct filename

class PatientDoctorMapping extends Model {
  public id!: number;
  public patientId!: number;
  public doctorId!: number;
  public appointmentDate!: Date;
  public createdAt!: Date;
  public updatedAt!: Date;
}

PatientDoctorMapping.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Patients", // Make sure this matches the actual table name
        key: "id",
      },
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Doctors", // Make sure this matches the actual table name
        key: "id",
      },
    },
    appointmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "PatientDoctorMapping",
  }
);

// ✅ Correct Relationships
PatientDoctorMapping.belongsTo(Patient, { foreignKey: "patientId", as: "patient" });
PatientDoctorMapping.belongsTo(Doctor, { foreignKey: "doctorId", as: "doctor" });

export default PatientDoctorMapping;
