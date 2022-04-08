const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');
const userRoutes = require("./userRoutes");
const adminRoutes = require("./adminRoutes");

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);

module.exports = router;