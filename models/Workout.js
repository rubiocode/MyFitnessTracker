// destructuring mongoose
const { model, Schema } = require('mongoose');

//requiring exerciseSchema

const exerciseSchema = require('./Exercise');

//Creating schema
const workoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date(),
    },
    exercises: [exerciseSchema]
});

module.exports = model ('Workout', workoutSchema);