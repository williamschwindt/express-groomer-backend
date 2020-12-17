const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const customerRouter = require('./routers/customers/customersRouter');
const groomersRouter = require('./routers/groomers/groomersRouter');
const server = express();
const port = process.env.PORT || 6000;

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/customers', customerRouter);
server.use('/groomers', groomersRouter);

server.use((err, req, res) => {
  console.log(err);
  res.status(500).json({
    message: 'somthing went wrong',
  });
});

if (!module.parent) {
  server.listen(port, () => {
    console.log(`server running on port: ${port}`);
  });
}

module.exports = server;
