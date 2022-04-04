// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
    foreignHey: "category_id"
})

// Categories have many Products
Category.hasMany(Product, {
        foreignKey: "category_id"
    })
    // Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
    through: {
        model: ProductTag,
        unique: false
    },
    as: "tag"
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
    through: {
        model: ProductTag,
        unique: false
    },
    as: "product"
})
module.exports = {
    Product,
    Category,
    Tag,
    ProductTag,
};