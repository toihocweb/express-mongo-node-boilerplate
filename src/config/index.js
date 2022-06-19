const dotEnv = require('dotenv');

const node_env = process.env.NODE_ENV || 'dev';

if (node_env !== 'prod') {
  const configFile = `./.env.${node_env}`;
  dotEnv.config({ path: configFile });
  console.log(`---> Working on ${node_env} env`);
} else {
  dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
};
