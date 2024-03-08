require('dotenv').config();

const app = require('./app');

const { NODE_ENV, PROD_BACK_URL, DEV_BACK_URL, PORT_HTTP = 4000 } = process.env;

console.log(NODE_ENV === 'production' ? PROD_BACK_URL : DEV_BACK_URL);

/* eslint-disable no-console */
(() => {
  try {
    // console.info('  -> Connected to Firebase!');
    app.listen(PORT_HTTP, () => console.log(`  -> Server HTTP:  http://localhost:${PORT_HTTP}/`));
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
})();
