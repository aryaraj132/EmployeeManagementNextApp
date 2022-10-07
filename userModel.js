const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: false
    },
  department: {
    type: String,
    required: false
    },
  joiningDate: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false
    }
});

module.exports = mongoose.model("User",user)