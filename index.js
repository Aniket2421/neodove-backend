const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const http = require('http');
const setupWebSocket = require('./wsServer');
const cors = require('cors');
require("dotenv").config()


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB is Connected"))
    .catch((err) => console.log(err));

const server = http.createServer(app);
setupWebSocket(server);

server.listen(process.env.SERVER_PORT, () => {
    console.log('Server is running ');
});
