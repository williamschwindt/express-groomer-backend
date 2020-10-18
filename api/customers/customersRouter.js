const express = require('express');
const router = express.Router();
const customersModel = require('./customersModel');

router.get('/', async (req, res) => {
  try {
    const customers = await customersModel.findAll();
    return res.status(200).json({ customers });
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
