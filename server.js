require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const subscribersRouter = require('./routes/subscribers');

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.log('Error while connecting to the db'));

db.on('open', () => console.log('Connected to the db'));

app.use(express.json());

// app.use('/', (req, res, next) => {
//    if (req.headers.key == null) {
//       res.status(401).json({ message: 'Authorization error' });
//       return;
//    } else {
//       if (req.headers.key !== '5f76ada3a5e4f3269fc3715c') {
//          res.status(401).json({ message: 'Invalid authorization key' });
//       } else {
//          next();
//       }
//    }
// });

app.use('/subscribers', subscribersRouter);

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
   console.log(`Server started on http://127.0.0.1:${port}`);
});
