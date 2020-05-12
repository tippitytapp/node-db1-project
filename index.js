require('dotenv').config();
const morgan = require('morgan');
const helmet = require('helmet');
const colors = require('colors');
const server = require("./api/server.js");

const PORT = process.env.PORT;

if(process.env.NODE_ENV === 'development'){
  server.use(morgan('dev'));
}

server.listen(PORT, () => {
  console.log(`\n== Marc's API is running in ${process.env.NODE_ENV} mode on http://localhost:${PORT} ==\n`.cyan.bold.underline);
});
