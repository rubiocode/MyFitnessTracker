//requiring express and router function
const router = require('express').Router();


//requiring Workout model 
const Workout = require('../models/Workout');

//Getting last workout
router.get('/api/workouts', async (req, res) => {
    try {
        const lastWorkout = await Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {$sum: "$exercises.duration"}
                }
            },
            /*{
                $addFields:{
                    name: ["$exercises.name"]
                }
            }*/
        ]).sort({ date: -1 });
        console.log(lastWorkout);
        res.status(200).json(lastWorkout);
    } catch (e) {
        res.status(500).json(e);
    }
});


//Getting all workouts in range from Workout
router.get('/api/workouts/range', async (req, res) => {
    try {
        const allWorkouts = await Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration"
                    }
                }
            }
        ]).sort({ day: -1 }).limit(7);
        res.status(200).json(allWorkouts);
    } catch (e) {
        res.status(500).json(e);
    }
})

//Creating a new workout
router.post('/api/workouts', async (req, res) => {
    try {
        const newWorkout = await Workout.create(req.body);
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


//Deleting workouts
router.delete("/api/workouts", ({ body }, res) => {
    Workout.findByIdAndDelete(body.id)
        .then(() => {
            res.json(true);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;