const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destinationSchema = new Schema(
  {
    airport: {
      type: String,
      enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
      required: true,
    },
    arrival: {
      type: Date,
      default: function () {
        return new Date().toLocaleString();
        // return new Date().toLocaleDateString();
        // return new Date().toLocaleTimeString();
      },
    },
  },
  {
    timestamps: true,
  }
);

const flightSchema = new Schema(
  {
    airline: {
      type: String,
      enum: ["American", "Southwest", "United"],
      required: true,
    },
    airport: {
      type: String,
      enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
      default: "DEN",
      required: true,
    },
    flightNo: {
      type: Number,
      min: 10,
      max: 9999,
      required: true,
    },
    departs: {
      type: Date,
      required: true,
      default: function () {
        const today = new Date();
        const year = today.getFullYear();
        return today.setFullYear(year + 1);
      },
    },
    destinations: [destinationSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Flight", flightSchema);
