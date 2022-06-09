const { PORT, DATABASE_CONNECTION_STRING } = require('./config.json');
const cors = require('cors')

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const petsRouter = require('./routes/pets');
const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');

app.use(cors());
app.use(express.json());

app.use('/', homeRouter);
app.use('/pets', petsRouter);
app.use('/user', userRouter);

mongoose.connect(DATABASE_CONNECTION_STRING)
    .then(app.listen(PORT, () => console.log(`Server started at http://localhost:5000 ...`)))
    .catch(error => console.log(error));

