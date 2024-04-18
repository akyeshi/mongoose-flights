const express = require('express');
const router = express.Router();
const ticketsCtrl = require('../controllers/tickets');

// GET /tickets/:id
// GET  
router.get('/flights/:id/tickets/new', ticketsCtrl.new); 

// POST /flights/:id/tickets (create ticket for a flight)
router.post('/flights/:id/tickets', ticketsCtrl.create);

// DELETE /tickets 
router.delete('/tickets/:id', ticketsCtrl.delete); 

module.exports = router;