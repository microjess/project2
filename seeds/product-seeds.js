const { Product } = require('../models');

const productData = [
  {
    product_name: 'Brightside T-Shirt',
    price: 78.00,
    stock: 22,
    category_id: 1,
  },
  {
    product_name: 'Terrycloth Shorts',
    price: 55.0,
    stock: 30,
    category_id: 2,
  },
  {
    product_name: 'Dune Bikini Set',
    price: 108.70,
    stock: 7,
    category_id: 3,
  },
  {
    product_name: 'Monterey Sneakers',
    price: 127.00,
    stock: 11,
    category_id: 4,
  },
  {
    product_name: 'Brixton Full Brim Hat',
    price: 32.60,
    stock: 18,
    category_id: 5,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;