const express = require('express');
const mongoose = require('mongoose');
const subscribersRouter = require('./routes/subscribers');

const app = express();

const database_url = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/subscribers';

mongoose.connect(database_url, {
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

const port = process.env.PORT || 3000;
const ip = process.env.HOST || '0.0.0.0';

app.listen(port, ip, () => {
   console.log(`
    ==================================
    Server is running on ${ip}:${port}
    Serve from ${__dirname}/${project_folder}
    ==================================
    `);
});
