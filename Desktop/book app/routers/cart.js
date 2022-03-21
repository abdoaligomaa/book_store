const router = require('express').Router()
const cartControle=require('../controllers/cart')

router.get('/addtocart',cartControle.Addtocart)
router.get('/',cartControle.getCartPage)


module.exports=router