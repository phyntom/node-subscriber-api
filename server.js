require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const subscribersRouter = require('./routes/subscribers');

const app = express();

console.log(process.env.DATABASE_URL);

mongoose.connect(process.env.DATABASE_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.log('Error while connecting to the db'));

db.on('open', () => console.log('Connected to the db'));

app.use(express.json());

app.get('/', (req, res) => {
   res.send('Hello World!');
});

app.use('/subscribers', subscribersRouter);

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
   console.log(`Server started on http://127.0.0.1:${port}`);
});
