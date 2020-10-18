const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.log('');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    console.log('');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    console.log('');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id', async (req, res) => {
  try {
    console.log('');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    console.log('');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
