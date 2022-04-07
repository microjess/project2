const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Role extends Model {
}
//Defining structure of the Role table
Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "role",
  }
);

module.exports = Role;