const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const router = require('./router');
const errorMiddleware = require('./middlewares/error-middleware');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware);

const startApp = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        app.listen(PORT, () => console.log('Server started on PORT: ' + PORT));
    } catch (e) {
        console.log(e);
    }
}

startApp();