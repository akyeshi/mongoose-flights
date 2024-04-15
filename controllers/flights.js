const Flight = require("../models/flight");

module.exports = {
  new: newFlight,
  create,
  index,
};

function newFlight(req, res) {
  res.render("flights/new", { errorMsg: "" });
}

async function create(req, res) {
  console.log('create flight: '); 
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    await Flight.create(req.body);
    // Always redirect after CUDing data
    // We'll refactor to redirect to the movies index after we implement it
    res.redirect("/flights");
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render("flights/new", { errorMsg: err.message });
  }
}

async function index(req, res) {
  const flights = await Flight.find({});
  // const flights = await Flight.find({}).sort('departs'); 
  res.render("flights", { flights });
}
