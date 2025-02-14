import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"; // Import shared instance

class Patient extends Model {
  public id!: number;
  public name!: string;
  public age!: number;
  public gender!:Gender ;
  public medicalHistory!: string[];
  public createdAt!:Date;
  public updatedAt!:Date;

}

enum Gender {
  male = "male",
  female = "female",
  other = "other"
}


Patient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: false,
    },
    medicalHistory: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    sequelize, // Use shared instance
    modelName: "Patient",
  }
);

export default Patient;
