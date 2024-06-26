const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    seat: {
      type: String,
      match: /[A-F][1-9]\d?/,
    },
    price: {
      type: Number,
      min: 1,
    },
    flight: {
      type: Schema.Types.ObjectId,
      ref: "Flight",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compile the schema into a model and export it
module.exports = mongoose.model("Ticket", ticketSchema);
