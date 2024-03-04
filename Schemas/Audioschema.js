const mongoose = require('mongoose');


const audioSchema = new mongoose.Schema({
   agent: String,
  surveyId: String,
  category: String,
  questionNumber: Number,
  audioPath: String,
  contentType: String,
});


const Audio = mongoose.model('Audio', audioSchema);

module.exports = Audio;
