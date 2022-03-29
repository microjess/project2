const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init({
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
    product_id: {
        //making the type of data stored in this column an integer
        type: DataTypes.INTEGER,
        //references the Product model's id
        references: {
            model: "product",
            key: "id"
        }
    },
    tag_id: {
        //making the type of data stored in this column an integer
        type: DataTypes.INTEGER,
        //references the Tag model's id
        references: {
            model: "tag",
            key: "id"
        }
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
});

module.exports = ProductTag;