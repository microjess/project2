// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init({
    id: {
        //making the field type an integer, only numbers
        type: DataTypes.INTEGER,
        //does not allow empty values
        allowNull: false,
        //making id the primary key
        primaryKey: true,
        //increases by 1 with each record
        autoIncrement: true
    },
    product_name: {
        //makeing field type a string
        type: DataTypes.STRING,
        //does not allow empty values
        allowNull: false
    },
    price: {
        //making field type a number with decimal
        type: DataTypes.DECIMAL,
        //does not allow empty values
        allowNull: false,
        //confirms the value is a decimal
        validate: {
            isDecimal: true
        }
    },
    stock: {
        //making the field type an integer, only numbers
        type: DataTypes.INTEGER,
        //does not allow empty values
        allowNull: false,
        //sets the default value to 10
        defaultValue: 10,
        //confirms the value is a number
        validate: {
            isNumeric: true
        }
    },
    category_id: {
        //making the field type an integer, only numbers
        type: DataTypes.INTEGER,
        //references or links, in a way, id to category table 
        references: {
            model: "category",
            key: "id"
        }
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
});

module.exports = Product;