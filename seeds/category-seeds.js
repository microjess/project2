const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Tops',
  },
  {
    category_name: 'Bottoms',
  },
  {
    category_name: 'Swimwear',
  },
  {
    category_name: 'Shoes',
  },
  {
    category_name: 'Accessories',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
