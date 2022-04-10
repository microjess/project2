const router = require("express").Router();
const { Category, Product } = require("../models")



router.get('/landingpage', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['product_name'],
        }
      ]
    });
    const caterogies = categoryData.map( (category) => {
      category.get({plain: true})
    })

    res.render('landingpage', {
      ...caterogies,
    })
  }
  catch (err) {
    console.log(err)
    res.status(500).json("Error on Rendering handle bars /landing page");
  }
})


router.get('/product/:id', async (req, res) =>{
  try {
    const productData = await Product.findByPk(req.params.id)

    res.status(201).json(productData)
  }
  catch (err){
    console.log(err)
    res.status(500).json(err)
  }
})




module.exports = router;
