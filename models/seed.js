///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
require('dotenv').config();
const mongoose = require("../config/connection");
const Fruit = require("./Fruit");
const starFruits = require('./seedData');
///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

// save the connection in a variable
const db = mongoose.connection;

// Make sure code is not run till connected
db.on("open", () => {
  ///////////////////////////////////////////////
  // Write your Seed Code Below
  //////////////////////////////////////////////

  // Run any database queries in this function

  // Delete all fruits
  Fruit.deleteMany({})
    .then((deletedFruits) => {
      // add the starter fruits
      Fruit.insertMany(starFruits)
        .then((NewFruits) => {
          // log the New fruits to confirm their creation
          console.log(NewFruits);
          db.close();
        })
        .catch((error) => {
          console.log(error);
          db.close();
        });
    })
    .catch((error) => {
      console.log(error);
      db.close();
    });

  ///////////////////////////////////////////////
  // Write your Seed Code Above
  //////////////////////////////////////////////
});