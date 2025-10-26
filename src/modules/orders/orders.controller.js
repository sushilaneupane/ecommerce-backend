import OrdersService from "./orders.service.js";

class OrdersController {
  constructor() {
    this.ordersService = new OrdersService();
  }

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
        order: newOrder, 
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating orders', error: error.message });
    }
  };


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

  updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { orderStatus } = req.body;
    try {
      const updatedOrder = await this.ordersService.updateOrderStatus(orderStatus, orderId);
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
    } catch (error) {
      res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
  };
    getAllOrders = async (req, res) => {
    try {
      const orders = await this.ordersService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
  };
}


export default OrdersController;
