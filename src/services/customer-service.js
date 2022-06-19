const { CustomerRepository } = require('../database');
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');
const { APIError, BadRequestError, NotfoundError } = require('../utils/app-errors');

// All Business logic will be here
class CustomerService {
  constructor() {
    this.repository = new CustomerRepository();
  }

  async SignIn(userInputs) {
    const { email, password } = userInputs;

    const existingCustomer = await this.repository.FindCustomer({ email });

    if (!existingCustomer) {
      throw new NotfoundError();
    }

    const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);

    if (!validPassword) {
      throw new BadRequestError('Password is incorrect');
    }

    const token = await GenerateSignature({
      email: existingCustomer.email,
      _id: existingCustomer._id,
    });

    return FormateData({ id: existingCustomer._id, token });
  }

  async SignUp(userInputs) {
    const { email, password, phone } = userInputs;

    const salt = await GenerateSalt();

    const userPassword = await GeneratePassword(password, salt);

    // check existed
    const existedCustomer = await this.repository.FindCustomer({ email });

    if (existedCustomer) {
      throw new BadRequestError('User is already in use');
    }

    const existingCustomer = await this.repository.CreateCustomer({
      email,
      password: userPassword,
      phone,
      salt,
    });

    const token = await GenerateSignature({
      email,
      _id: existingCustomer._id,
    });

    return FormateData({ id: existingCustomer._id, token });
  }
}

module.exports = CustomerService;
