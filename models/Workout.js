module.exports = function () {
    var mongoose = require('mongoose'),
        Exercise = require('./Exercise.js'),
        exerciseSchema = mongoose.model('Exercise').schema,
        Schema = mongoose.Schema;

    //Creating schema
    const workoutSchema = new Schema({
        day: {
            type: Date,
            default: () => new Date(),
        },
        exercises: [exerciseSchema]
    });

    return mongoose.model('Workout', workoutSchema);
}