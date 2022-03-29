const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init({
    id: {
        //making the id a number value
        type: DataTypes.INTEGER,
        //does not allow null or empty values
        allowNull: false,
        //making id the primary key
        primaryKey: true,
        //making the id field an auto number, increases by 1 with each record
        autoIncrement: true
    },
    category_name: {
        //making category_name a string value
        type: DataTypes.STRING,
        //does not allow null or empty values
        allowNull: false
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
});

module.exports = Category;