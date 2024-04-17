const Flight = require("../models/flight");

module.exports = {
  create,
};

async function create(req, res) {
  const flight = await Flight.findById(req.params.id);
  req.body.arrival += "T00:00";
  flight.destinations.push(req.body);

  try {
    await flight.save();
  } catch (err) {
    console.log(err.message);
  }
  res.redirect(`/flights/${flight._id}`);
}
