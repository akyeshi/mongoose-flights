const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

module.exports = {
  new: newFlight,
  create,
  index,
  show,
};

function newFlight(req, res) {
  const newFlight = new Flight();
  // Obtain the default date
  const dt = newFlight.departs;
  // Format the date for the value attribute of the input
  let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
  departsDate += `-${dt.getDate().toString().padStart(2, "0")}T${dt
    .toTimeString()
    .slice(0, 5)}`;
  res.render("flights/new", { errorMsg: "", departsDate });
}

async function create(req, res) {
  console.log("create flight: ");
  // delete empty properties, so that Mongoose default will take effect
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
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

async function show(req, res) {
  // Populate the cast array with performer docs instead of ObjectIds
  const flight = await Flight.findById(req.params.id);
  const tickets = await Ticket.find({flight: flight._id}); 
  // how to populate a ticket’s flight property
  // const tickets = await Ticket.findById(req.params.id).populate('flight'); 
  console.log(`flight ---\n${flight}`);
  console.log(`tickets ---\n${tickets}`); 
  // const performers = await
  res.render("flights/show", { title: "Flight Detail", flight, tickets });
}
