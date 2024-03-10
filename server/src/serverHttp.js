require('dotenv').config();

const app = require('./app');

const { PORT_HTTP = 4000 } = process.env;

(() => {
  try {
    /* eslint-disable no-console */
    app.listen(PORT_HTTP, () => console.log(`  -> Server http://localhost:${PORT_HTTP}`));
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
})();
