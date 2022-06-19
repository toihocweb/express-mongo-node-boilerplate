const { ValidateSignature } = require('../../utils');

const jwtAuth = async (req, res, next) => {
  const isAuthorized = await ValidateSignature(req);

  if (isAuthorized) {
    return next();
  }
  return res.status(403).json({ message: 'Not Authorized' });
};
module.exports = { jwtAuth };
