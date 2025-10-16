import OrdersService from "./orders.service.js";

class OrdersController {
  constructor() {
    this.ordersService = new OrdersService();
  }

  // Create a new order
  createOrders = async (req, res) => {
    const { userId, shippingCost, totalAmount, addressId, products, transactionId, paymentMethod } = req.body;
    try {
      const newOrder = await this.ordersService.createOrders(
        userId,
        shippingCost,
        totalAmount,
        addressId,
        products,
        transactionId,
        paymentMethod
      );
      res.status(201).json({
        message: "Order created successfully!",
        order: newOrder, // optionally return the created order
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating orders', error: error.message });
    }
  };

  // Get orders by user
  getOrdersByUser = async (req, res) => {
    const { userId } = req.params;
    try {
      const orders = await this.ordersService.getOrdersByUser(userId);
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for this user' });
      }
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
  };
}

export default OrdersController;
