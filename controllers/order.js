const { Order, ProductCart } = require("../models/order");
const user = require("../models/user");
const { populate } = require("../models/user");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order found in DB",
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in DB",
      });
    }
    console.log(order);
    
    res.json(order);
  });
};

exports.getOrder = (req,res) =>{
  return res.json(req.order)
}

exports.getAllOrders = (req,res) =>{
  Order.find().exec((err,orders)=>{
      if(err){
          return res.status(400).json({
              error:"No orders found in DB"
          });
      } 
      res.json(orders);
  });
};

exports.getOrderStatus = (req, res) => {
  //return res.json(Order.schema.path("status").defaultValue);
  Order.findById(
    {_id:req.order._id},
    (err, status) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Cannot find order status",
        });
      }
      res.json(status);
    }
  )
};

exports.updateStatus = (req, res) => {
  Order.findByIdAndUpdate(
    { _id: req.order._id },
    { $set: req.body },
    {new : true, userFindAndModify: false},
    (err, updatedstatus) => {
      if (err) {
        console.log(err);
        
        return res.status(400).json({
          error: "Cannot update order status",
        });
      }
      res.json(updatedstatus);
    }
  );
};

//delete controller
exports.deleteOrder = (req, res) => {
  let order = req.order;
  order.remove((err, deletedOrder) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the order",
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedOrder,
    });
  });
};
