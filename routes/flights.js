const express = require("express");
const router = express.Router();
const flightCtrl = require('../controllers/flights'); 



// GET /flights/new 
router.get('/new', flightCtrl.new); 

// GET /flights
router.get('/', flightCtrl.index); 

// POST /flights 
router.post('/', flightCtrl.create); 








module.exports = router;
