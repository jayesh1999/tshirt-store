const express = require('express');
const router = express.Router();

const {isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth')
const {getUserById,pushOrderInPurchaseList} = require('../controllers/user');
const {updateStock} = require('../controllers/product')

const {getOrderById,createOrder,getAllOrders,getOrder,updateStatus,getOrderStatus, deleteOrder} = require('../controllers/order')

//param
router.param('userId',getUserById);
router.param('orderId',getOrderById);

//create
router.post('/order/create/:userId',createOrder,pushOrderInPurchaseList,updateStock)

//read
router.get('/orders',getAllOrders)
router.get('/order/:orderId',getOrder);

//delete route
router.delete('/order/:orderId/:userId',isSignedIn,isAuthenticated,isAdmin,deleteOrder);

//status of order
router.get('/order/status/:userId/:orderId',isSignedIn,isAuthenticated,isAdmin,getOrderStatus)
router.put('/order/:orderId/status/:userId',isSignedIn,isAuthenticated,isAdmin,updateStatus)

module.exports = router;