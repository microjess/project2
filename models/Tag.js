const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init({
    id: {
        //making the type of data stored in this column an integer
        type: DataTypes.INTEGER,
        //NOT NULL
        allowNull: false,
        //Primary Key
        primaryKey: true,
        //Auto increment
        autoIncrement: true
    },
    tag_name: {
        //making the type of data stored in this column a string
        type: DataTypes.STRING
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
});

module.exports = Tag;