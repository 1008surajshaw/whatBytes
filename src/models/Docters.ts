import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"; // Import shared instance

class Doctor extends Model {
  public id!: number;
  public name!: string;
  public specialization!: string;
  public experience!: number;
  public createdAt!:Date;
  public updatedAt!:Date;
}

Doctor.init(
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
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
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
    sequelize,
    modelName: "Doctor",
  }
);


export default Doctor;
