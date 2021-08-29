// destructuring mongoose
const {model, Schema}= require ('mongoose');

//create schema
const exerciseSchema= new Schema ({
    distance: Number,
    duration: Number,
    name: String,
    reps: Number,
    sets: Number,
    Type: String,
    weight: Number,
},
{ 
    //adds createdAt and updatedAt to this schema
    timestamp: true,
});

module.exports = model ('Exercise', exerciseSchema);