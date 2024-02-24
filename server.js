/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config();
require('./config/connection.js');
const express = require('express');
const middleware = require('./utils/middleware.js')



/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
// Set up the view engine
const app = express();
app.set('view engine', 'jsx');
app.engine('jsx', require("express-react-views").createEngine());



/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
middleware(app);


////////////////////////////////////////////
// Routes
////////////////////////////////////////////
// app.get("/", (req, res) => {
//     res.send("your server is running... better catch it.");
//   });

const fruits = require('./controllers/fruits.js');
app.use('/fruits', fruits);

const vegetables = require('./controllers/vegetables.js');
app.use('/vegetables', vegetables);

const usersController = require('./controllers/usersController.js');
app.use('/users', usersController);

//Seed Route
//Home Page
app.get('/',(req, res)=>{
    res.render('Home.jsx')
})

//Induces
// Index
// New
//Delete
//update
// Data Sanitization
//Create
// Show


//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen( PORT || 3000, () => {
    console.log(`listening on port ${PORT}`);
  });