import paymentRepository from './payment.repository.js';

class PaymentService {
  constructor() {
    this.paymentRepository = new paymentRepository();
  }

  async getAllPayments() {
    try {
      return await this.paymentRepository.getAllPayments();
    } catch (error) {
      throw new Error('Error fetching payments: ' + error.message);
    }
  }
  async updatePaymentStatus(paymentStatus, paymentId) {
    try {
      const result = await this.paymentRepository.updatePaymentStatus(paymentStatus, paymentId);
      return result;
    } catch (error) {
      throw new Error('Error updating payment status: ' + error.message);
    }   
  }
}

export default PaymentService;
