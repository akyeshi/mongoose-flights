const router = require("express").Router();
const destinationsCtrl = require("../controllers/destinations");

// add/embed destination document into the flight document
router.post("/flights/:id/destinations", destinationsCtrl.create);

module.exports = router;
