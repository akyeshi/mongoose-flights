const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

module.exports = {
  create,
  delete: deleteTicket,
  new: newTicket,
};

async function create(req, res) {
  const flight = await Flight.findById(req.params.id);
  req.body.flight = flight;
  const ticket = await Ticket.create(req.body); // create ticket

  // We can push (or unshift) subdocs into Mongoose arrays
  try {
    // Save any changes made to the movie doc
    await ticket.save();
  } catch (err) {
    console.log(err);
  }
  // Step 5:  Respond to the Request (redirect if data has been changed)
  res.redirect(`/flights/${flight._id}`);
}

async function deleteTicket(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  const flight = await Flight.findOne({
    "ticket._id": req.params.id,
  });
  // Rogue user!
  if (!ticket) return res.redirect("/flights");
  // Remove the review using the remove method available on Mongoose arrays
  flight.tickets.remove(req.params.id);
  // Save the updated movie doc
  await flight.save();
  // Redirect back to the movie's show view
  res.redirect(`/flights/${flight._id}`);
}

async function newTicket(req, res) {
  res.render("tickets/new", {
    title: "Create a New Ticket",
    flightId: req.params.id,
    errorMsg: "error is happening",
  });
}
