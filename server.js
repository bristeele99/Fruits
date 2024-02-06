/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const Fruit = require('./models/Fruit.js');
const Vegetable = require('./models/Vegetable.js')
const methodOverride = require('method-override');
const path = require('path');
const morgan = require('morgan');


/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
// Set up the view engine
const app = express();
app.set('view engine', 'jsx');
app.engine('jsx', require("express-react-views").createEngine());

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Events for when connection opens/disconnects/errors
mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error));

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny"));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("your server is running... better catch it.");
  });


//Seed Route
app.get('/fruits/seed', (req, res) => {
    Fruit.create([
      {
        name: 'grapefruit',
        color: 'pink',
        readyToEat: true
      },
      {
        name: 'grape',
        color: 'purple',
        readyToEat: false
      },
      {
        name: 'avocado',
        color: 'green',
        readyToEat: true
      }
    ])
      .then(createdFruits => res.redirect('/fruits'))
      .catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  });
  

//Home Page
app.get('/',(req, res)=>{
    res.render('home')
})

//Induces

// Index
app.get('/fruits', (req, res) => {
    //find returns an array of objects
    Fruit.find({})
        .then((allFruits) => {
            res.render('fruits/Index', { fruits: allFruits });
        })
    .catch((err)=> console.error(err));
});

app.get('/vegetables', (req, res) => {
    //find returns an array of objects
    Vegetable.find({})
        .then((allVegetables) => {
            res.render('vegetables/Index', { vegetables: allVegetables });
        })
    .catch((err)=> console.error(err));
});

// New
app.get('/fruits/new', (req, res) => {
    res.render('fruits/New');
});

app.get('/vegetables/new', (req, res) => {
    res.render('vegetables/New');
});

//Delete

app.delete('/fruits/:id', (req, res)=>{
    Fruit.deleteOne({_id: req.params.id})
    .then(deleteInfo => {
        console.log(deleteInfo)
        res.redirect('/fruits')
    })
    .catch(err => console.error(err));
})

app.get('/fruits/:id/edit', (req, res)=>{
    Fruit.findOnd(req.params.id, (err, foundFruit)=>{ //find the fruit
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

//update

app.put('/fruits/:id', (req, res)=>{
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


// Data Sanitization
//Create
app.post('/fruits', (req, res) => {
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    Fruit.create(req.body)
    .then((createdFruit) => {
        res.redirect('fruits')
    }) 
    .catch((err) => console.error(err));
});

app.post('/vegetables', (req, res) => {
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

// Show
app.get('/fruits/:id', (req, res) =>  {
    //findOne returns the first object that matches _id: req.params.id  
    Fruit.findOne({ _id: req.params.id}).then((foundFruit)=>{
        res.render('fruits/Show', {
            fruit: foundFruit
    });
    })
    .catch(err => console.error(err))
});

app.get('/vegetables/:id', (req, res) =>  {
    //findOne returns the first object that matches _id: req.params.id  
    Vegetable.findOne({ _id: req.params.id}).then((foundVegetable)=>{
        res.render('vegtables/Show', {
            vegetable: foundVegetable
    });
    })
    .catch(err => console.error(err))
});

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////

app.listen(3000, () => {
    console.log('listening');
  });