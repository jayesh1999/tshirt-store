const express = require('express');
const router = express.Router();

const {getProductById,createProduct,getProduct,photo,updateProduct,deleteProduct,getAllProducts,getAllUniqueCategories} = require('../controllers/product');
const {isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth')
const {getUserById} = require('../controllers/user');

//param
router.param('userId',getUserById);
router.param('productId',getProductById);

//actual routes

//read route
router.get('/product/:productId',getProduct);
router.get('/product/photo/:productId',photo);

//create
router.post('/product/create/:userId',isSignedIn,isAuthenticated,isAdmin,createProduct);

//update route
router.put('/product/:productId/:userId',isSignedIn,isAuthenticated,isAdmin,updateProduct);

//delete route
router.delete('/product/:productId/:userId',isSignedIn,isAuthenticated,isAdmin,deleteProduct);

//listing route
router.get('/products',getAllProducts);

router.get('/products/categories',getAllUniqueCategories)

module.exports = router;