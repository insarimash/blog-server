const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { response } = require("express");
require('./models/Post');
require('./models/User');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());
console.log(process.env);

mongoose.connect(
    process.env.MONGODB_CONNECTION_URL
    )

mongoose.connection.on('connected', () => {
    console.log('Connected to database');
})


app.use('/posts',require('./routes/posts.js'))
app.use('/auth', require('./routes/auth'))

app.listen(3004, () =>{
    console.log("http://localhost:3004");
});

