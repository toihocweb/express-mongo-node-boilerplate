const CustomerService = require('../services/customer-service');
const customerSchema = require('../validation/customer');
const validation = require('./middlewares/validation');

module.exports = (app) => {
  const service = new CustomerService();

  app.post('/customer/signup', validation(customerSchema.signup), async (req, res, next) => {
    try {
      const { email, password, phone } = req.body;
      const { data } = await service.SignUp({ email, password, phone });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post('/customer/login', validation(customerSchema.signin), async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const { data } = await service.SignIn({ email, password });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });
};
