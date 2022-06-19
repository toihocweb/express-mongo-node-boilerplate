const { CustomerModel, AddressModel } = require('../models');
const { APIError, BadRequestError, STATUS_CODES } = require('../../utils/app-errors');

// Dealing with data base operations
class CustomerRepository {
  async CreateCustomer({ email, password, phone, salt }) {
    try {
      const customer = new CustomerModel({
        email,
        password,
        salt,
        phone,
        address: [],
      });
      const customerResult = await customer.save();
      return customerResult;
    } catch (err) {
      throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Customer');
    }
  }

  async FindCustomer({ email }) {
    try {
      const existingCustomer = await CustomerModel.findOne({ email });
      return existingCustomer;
    } catch (err) {
      throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Customer');
    }
  }

  async FindCustomerById({ id }) {
    try {
      const existingCustomer = await CustomerModel.findById(id)
        .populate('address')
        .populate('wishlist')
        .populate('orders')
        .populate('cart.product');
      return existingCustomer;
    } catch (err) {
      throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Customer');
    }
  }
}

module.exports = CustomerRepository;
