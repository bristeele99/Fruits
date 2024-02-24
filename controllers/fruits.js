////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Fruit = require("../models/Fruit");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
    if (req.session.loggedIn) {
      next();
    } else {
      res.redirect("/users/login");
    }
  });

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

//Seed Route
router.get('/seed', (req, res) => {
    Fruit.create(starFruits)
      .then(createdFruits => res.redirect('/fruits'))
      .catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  });

router.get('/', (req, res) => {
    //find returns an array of objects
    Fruit.find({ username: req.session.username })
        .then((allFruits) => {
            res.render('fruits/Index', { fruits: allFruits });
        })
    .catch((err)=> console.error(err));
});

router.get('/new', (req, res) => {
    res.render('fruits/New');
});

router.delete('/:id', (req, res)=>{
    Fruit.deleteOne({_id: req.params.id})
    .then(deleteInfo => {
        console.log(deleteInfo)
        res.redirect('/fruits')
    })
    .catch(err => console.error(err));
})

router.get('/:id/edit', (req, res)=>{
    Fruit.findOne(req.params.id, (err, foundFruit)=>{ //find the fruit
      if(!err){
        res.render(
    		  'Edit',
    		{
    			fruit: foundFruit //pass in the found fruit so we can prefill the form
    		}
    	);
    } else {
      res.send({ msg: err.message })
    }
    });
});

router.put('/:id', (req, res)=>{
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    Fruit.updateOne( {_id: req.params.id}, req.body)
    .then(updateInfo =>{
        console.log(updateInfo);
        res.redirect('/fruits/${req.params.id}')
    }).catch(err=> console.error(err));
    })

    router.post('/', (req, res) => {
        if (req.body.readyToEat === 'on') {
            req.body.readyToEat = true;
        } else {
            req.body.readyToEat = false;
        }
        req.body.username = req.session.username;

        Fruit.create(req.body)
        .then((createdFruit) => {
            res.redirect('fruits')
        }) 
        .catch((err) => console.error(err));
    });

    router.get('/:id', (req, res) =>  {
        //findOne returns the first object that matches _id: req.params.id  
        Fruit.findOne({ _id: req.params.id}).then((foundFruit)=>{
            res.render('fruits/Show', {
                fruit: foundFruit
        });
        })
        .catch(err => console.error(err))
    });
//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;