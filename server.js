//require dependencies
const express = require('express');
const mongoose = require ('mongoose');
const logger = require("morgan");
const path = require('path');
require('dotenv').config();

//getting routes
//const workout = require('./routes/workoutRoutes');

//requiring schemas
//const {Workout}= require ('./models');

//setting up Port
const PORT= process.env.PORT || 3001;

//different in production // if db not created yet mongoose will create db automatically
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //giving me errors to connect...
    useCreateIndex: true,
    useFindAndModify: false,
    
})
    .then(() => {
        console.log('Connected to mongodb successfully');
    })

    .catch(error => console.log(error));


//setting up express as a function
const app = express();


//logger middleware (dev: color coded)
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, 'public')));

//middlewares to get values from req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//requiring routes
//app.use(workout);
app.use(require('./routes/workoutRoutes.js'));
app.use(require('./routes/htmlRoutes.js'));

app.listen(PORT, ()=>{
    console.log(`Listening on http://localhost:${PORT}`);
} )

