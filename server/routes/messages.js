const express = require('express');
const router = express.Router();
const Message = require('../models/message');

// GET all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().populate('sender');
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new message
router.post('/', async (req, res) => {
  const message = new Message(req.body);
  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update message
router.put('/:id', async (req, res) => {
  try {
    const updatedMessage = await Message.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE message
router.delete('/:id', async (req, res) => {
  try {
    await Message.findOneAndDelete({ id: req.params.id });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
