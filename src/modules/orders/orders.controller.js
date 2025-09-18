import OrdersService from "./orders.service.js";

class OrdersController {
  constructor() {
    this.ordersService = new OrdersService();
  }


  createOrders = async (req, res) => {
    const { userId, shippingCost, totalAmount, addressId, products, transactionId, paymentMethod } = req.body;
    try {
      const newOrder = await this.ordersService.createOrders(userId, shippingCost, totalAmount, addressId, products, transactionId, paymentMethod);
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: 'Error creating orders', error: error.message });
    }
  };

}


export default OrdersController;