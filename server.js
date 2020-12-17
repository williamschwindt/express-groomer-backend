// const app = require('./api/app.js');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
// const indexRouter = require('./index/indexRouter');
// const profileRouter = require('./profile/profileRouter');
const customerRouter = require('./api/customers/customersRouter');
const groomerRouter = require('./api/groomers/groomersRouter');
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(cookieParser());
// application routes
// app.use('/', indexRouter);
// app.use(['/profile', '/profiles'], profileRouter);
app.use('/customers', customerRouter);
app.use('/groomers', groomerRouter);

app.use((err, req, res) => {
  console.log(err);
  res.status(500).json({
    message: 'somthing went wrong',
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
// app.timeout = 60 * 10 * 1000;
