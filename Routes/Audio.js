const express = require('express');

const Audio = require('../Schemas/Audioschema.js');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());


// POST API to post data
app.post('/audio', async (req, res) => {
  try {
    const audio = new Audio(req.body);
    await audio.save();
    res.status(201).send(audio);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET API to get all posted data
app.get('/audio', async (req, res) => {
  try {
    const audios = await Audio.find();
    res.send(audios);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET API to get data depending on category
app.get('/audio/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const audios = await Audio.find({ category });
    res.send(audios);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET API to get data depending on agent
app.get('/audio/agent/:agent', async (req, res) => {
  try {
    const agent = req.params.agent;
    const audios = await Audio.find({ agent });
    res.send(audios);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET API to get data depending on survey id
app.get('/audio/surveyId/:surveyId', async (req, res) => {
  try {
    const surveyId = req.params.surveyId;
    const audios = await Audio.find({ surveyId });
    res.send(audios);
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE API to delete all audios
app.delete('/audio', async (req, res) => {
  try {
    await Audio.deleteMany();
    res.send('All audios deleted successfully');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
