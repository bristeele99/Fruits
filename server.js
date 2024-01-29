require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Fruit = require('./models/Fruit.js');
const fruits = require('./models/fruits.js');
const Vegetable = require('./models/Vegetable.js')
const vegetables = require('./models/vegetables.js')


// Set up the view engine

app.set('view engine', 'jsx');
app.engine('jsx', require("express-react-views").createEngine());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.once('open',() =>{
    console.log('connected to mongo!');
  })

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});


//Home Page
app.get('/',(req, res)=>{
    res.render('home')
})

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
        res.render('Show', {
            fruit: foundFruit
    });
    })
    .catch(err => console.error(err))
});

app.get('/vegetables/:id', (req, res) =>  {
    //findOne returns the first object that matches _id: req.params.id  
    Vegetable.findOne({ _id: req.params.id}).then((foundVegetable)=>{
        res.render('Show', {
            vegetable: foundVegetable
    });
    })
    .catch(err => console.error(err))
});

app.listen(3000, () => {
    console.log('listening');
});
