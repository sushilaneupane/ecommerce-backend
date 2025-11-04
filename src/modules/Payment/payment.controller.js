import PaymentService from "./payment.service.js";
import Stripe from "stripe";

const stripe = new Stripe('sk_test_51SPpgz9dnkZdN5mX6g9tyjx1ysXEui3hr0rSwgiuMiRN3oSeBDnyzbXGkdf40cJHK2hm4lNfL3nCbkyWMmmZF34p00YIW1V9VV');
class PaymentController {
  constructor() {
    this.paymentService = new PaymentService();
  }
  getAllPayments = async (req, res) => {
    try {
      const payments = await this.paymentService.getAllPayments();
      res.status(200).json(payments);
    }
    catch (error) {
      res.status(500).json({ error: error.message })
    }
  };

  updatePayment = async (req, res) => {
    const { paymentId } = req.params;
    const { paymentStatus } = req.body;
    try {
      const updatedPayment = await this.paymentService.updatePaymentStatus(paymentStatus, paymentId);
      if (!updatedPayment) {
        return res.status(404).json({ message: 'Payment not found' });
      }
      res.status(200).json({ message: 'Payment status updated successfully', payment: updatedPayment });
    } catch (error) {
      res.status(500).json({ message: 'Error updating payment status', error: error.message });
    }
  };
  createEsewaTransaction = async (req, res) => {
    try {
      const { amount } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
}
export default PaymentController;
