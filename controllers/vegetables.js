const express = require("express");
const Vegetable = require("../models/Vegetable");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();


router.get('/', (req, res) => {
    //find returns an array of objects
    Vegetable.find({})
        .then((allVegetables) => {
            res.render('vegetables/Index', { vegetables: allVegetables });
        })
    .catch((err)=> console.error(err));
});

router.get('/new', (req, res) => {
    res.render('vegetables/New');
});

router.post('/', (req, res) => {
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    Vegetable.create(req.body)
    .then((createdVegetable) => {
        res.redirect('vegetables')
    }) 
    .catch((err) => console.error(err));
});


router.get('/:id', (req, res) =>  {
    //findOne returns the first object that matches _id: req.params.id  
    Vegetable.findOne({ _id: req.params.id}).then((foundVegetable)=>{
        res.render('vegtables/Show', {
            vegetable: foundVegetable
    });
    })
    .catch(err => console.error(err))
});
//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;