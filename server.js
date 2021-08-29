//require dependencies
const express = require('express');
const mongoose = require ('mongoose');
const logger = require("morgan");
require('dotenv').config();

//getting routes
const routes = require('./routes');

//requiring schemas
const {Workout, Exercise}= require ('./models');

//setting up Port
const PORT= process.env.PORT || 3001;

//different in production // if db not created yet mongoose will create db automatically
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //giving me errors to connect...
    //useCreateIndex: true,
    //useFindAndModify: false,
    
})
    .then(() => {
        console.log('Connected to mongodb successfully');
    })

    .catch(error => console.log(error));


//setting up express as a function
const app = express();


//logger middleware (dev: color coded)
app.use(logger("dev"));

//middlewares to get values from req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.listen(PORT, ()=>{
    console.log(`Listening on http://localhost:${PORT}`);
} )

