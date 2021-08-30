//requiring express and router function
const router = require('express').Router();

//Getting database from models
modelsdb = require('../models');

//deconstructing workout from model's folder 
const Workout = require('../models/Workout');

//Getting last workout
router.get('/api/workouts', async (req, res) => {
    try {
        const lastWorkout = await modelsdb.find({}).sort({day: -1}).limit(1);

        res.status(200).json(lastWorkout);
    } catch (e) {
        res.status(500).json(e);
    }
});

//Getting all workouts in range from modelsdb
router.get('/api/workouts/range', async (req, res)=>{
    try {
        const allWorkouts = await Workout.find({}).sort({day: -1});
        res.status(200).json(allWorkouts);
    } catch (e) {
        res.status(500).json(e);
    }
})

//Creating a new workout
router.post('/api/workouts', async (req, res) => {
    const {_id} = req.params;
    try {
        const newWorkout = await new Workout({});
        newWorkout.save();

        res.status(200).json(newWorkout);
    } catch (e) {
        res.status(500).json(e);
    }
});

//Updating a workout by adding exercise by id
router.put('/api/workouts/:id', async (req, res) => {
    try {
        const addExercise = await Workout.findByIdAndUpdate(req.params.id, {
            $push: {
                exercises: req.body
                },
            }, {
                new: true,
            },
        );
        
        res.status(200).json(addExercise);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;