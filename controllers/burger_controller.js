// Our Burger controller
// =====================
var express = require("express");

var router = express.Router();
// edit burger model to match sequelize
var db = require("../models/");

// get route -> index
router.get("/", function(req, res) {
  // send us to the next get function instead.
  res.redirect("/burger");
});

// get route, edited to match sequelize
router.get("/burger", function(req, res) {
  // replace old function with sequelize function
  db.Burger.findAll()
    // use promise method to pass the burgers...
    .then(function(dbBurger) {
      console.log(dbBurger);
      // into the main index, updating the page
      var hbsObject = { burger: dbBurger };
      return res.render("index", hbsObject);
    });
});

// post route to create burgers
router.post("/burger/create", function(req, res) {
  // edited burger create to add in a burger_name
  db.Burger.create({
    burger_name: req.body.burger_name
  })
    // pass the result of our call
  .then(function(dbBurger) {
      // log the result to our terminal/bash window
    console.log(dbBurger);
      // redirect
    res.redirect("/");
  });
});

// put route to devour a burger
router.put("/burger/update", function(req, res) {
  // update one of the burgers
  db.Burger.update({
    devoured: true
  },
    {
      where: {
        id: req.body.burger_id
      }
    }
  ).then(function(dbBurger) {
    res.redirect("/");
  });
});

module.exports = router;

// OLD VERSION**
// var express = require('express');
// var router = express.Router();
// var burger = require('../models/burger.js');

// router.get('/', function(req,res) {
// 	res.redirect('/burger')
// });

// router.get('/burger', function(req,res) {

// 	burger.all(function(data){
// 		res.render('index', {burgers : data});
// 	});
// });

// router.post('/burger/create', function(req,res) {
// 	burger.create(
// 		["burger_name"],
// 		[req.body.burger_name], 
// 		function(data){
// 		res.redirect('/burger')
// 	});
// });

// router.put('/burger/update/:id', function(req,res) {
// 	var condition = 'id = ' + req.params.id;

// 	console.log('condition', condition);

// 	burger.update({'devoured' : req.body.devoured}, condition, function(data){
// 		res.redirect('/burger');
// 	});
// });

// module.exports = router;