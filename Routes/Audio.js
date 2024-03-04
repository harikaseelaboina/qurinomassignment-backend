const express = require('express');
const router = express.Router();
const Audio = require('./'); // Assuming your schema is in audio.js

// POST API to post data
router.post('/audio', async (req, res) => {
  try {
    const audio = new Audio(req.body);
    await audio.save();
    res.status(201).send(audio);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET API to get all posted data
router.get('/audio', async (req, res) => {
  try {
    const audios = await Audio.find();
    res.send(audios);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET API to get data depending on category
router.get('/audio/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const audios = await Audio.find({ category });
    res.send(audios);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET API to get data depending on agent
router.get('/audio/agent/:agent', async (req, res) => {
  try {
    const agent = req.params.agent;
    const audios = await Audio.find({ agent });
    res.send(audios);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET API to get data depending on survey id
router.get('/audio/surveyId/:surveyId', async (req, res) => {
  try {
    const surveyId = req.params.surveyId;
    const audios = await Audio.find({ surveyId });
    res.send(audios);
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE API to delete all audios
router.delete('/audio', async (req, res) => {
  try {
    await Audio.deleteMany();
    res.send('All audios deleted successfully');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
