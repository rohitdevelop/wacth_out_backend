const OrderModel = require("../models/order.model");
 
// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = await OrderModel.create({
      user: req.user.id, // from auth middleware
      items,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// GET ORDERS FOR A USER
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ user: req.params.userId }).populate(
      "items.product",
      "name price productImage"
    );

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({message:"your sucessfully orders", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// GET ALL ORDERS (ADMIN)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate("user", "name email")
      .populate("items.product", "name price productImage");

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};