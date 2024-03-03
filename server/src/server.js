const app = require('./app');

const { PORT = 3000 } = process.env;

/* eslint-disable no-console */
(() => {
  try {
    // console.info('  -> Connected to Firebase!');
    app.listen(PORT, () => console.log(`  -> Server:  http://localhost:${PORT}/`));
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
})();
