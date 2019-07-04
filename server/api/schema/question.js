const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Questions = new Schema({
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: Array
  }

});


module.exports = mongoose.model("Questions", Questions);