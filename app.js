// Requiring Modules
const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const emailRoute = require('./routes/emailRoutes');

const app = express();

// Port to connect
const port = 3000;

//Middleware
app.use(express.json());
app.use('/api/email', emailRoute);

// GET route
app.get('/', (req, res) => {
    res.send(`Inside homepage`);
});

// DB Connection
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },
() => {
    console.log(`Connected to database`);
})

// Listening to the server
app.listen(port, () => {
    console.log(`App is running successfully on port ${port}`);
})