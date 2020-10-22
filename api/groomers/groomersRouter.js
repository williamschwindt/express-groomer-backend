const express = require('express');
const router = express.Router();
const groomersModel = require('./groomersModel');

router.get('/', async (req, res) => {
  try {
    // check if there is a query
    if (Object.keys(req.query).length !== 0) {
      const groomer = await groomersModel.findBy(req.query);
      return res.status(200).json(groomer);
    } else {
      const groomers = await groomersModel.findAll();
      return res.status(200).json(groomers);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const groomer = await groomersModel.findById(req.params.id);

    if (!groomer) {
      return res.status(404).json({
        message: 'the groomer with that id does not exist',
      });
    }

    res.status(200).json(groomer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    // check if the request body is emtpy
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: 'request body is required',
      });
    }

    const groomer = await groomersModel.findById(req.params.id);

    if (!groomer) {
      return res.status(404).json({
        message: 'the groomer with that id does not exist',
      });
    }

    const updatedGroomer = await groomersModel.update(req.params.id, req.body);

    return res.status(200).json(updatedGroomer[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const newGroomer = req.body;
  try {
    if (
      !newGroomer.name ||
      !newGroomer.lastname ||
      !newGroomer.address ||
      !newGroomer.phone ||
      !newGroomer.email
    ) {
      return res.status(400).json({
        message: 'request body needs name, lastname, address, phone, and email',
      });
    }

    const groomerPhoneExists = await groomersModel.findBy({
      phone: newGroomer.phone,
    });

    if (groomerPhoneExists && groomerPhoneExists.length !== 0) {
      return res.status(400).json({
        message: 'a user with this phone number already exists',
      });
    }

    const groomerEmailExists = await groomersModel.findBy({
      email: newGroomer.email,
    });

    if (groomerEmailExists && groomerEmailExists.length !== 0) {
      return res.status(400).json({
        message: 'a user with this email address already exists',
      });
    } else {
      const addedGroomer = await groomersModel.create(newGroomer);
      res.status(201).json(addedGroomer[0]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const groomer = await groomersModel.findById(req.params.id);

    if (!groomer) {
      return res.status(404).json({
        message: 'the groomer with that id does not exist',
      });
    }

    await groomersModel.remove(req.params.id);
    return res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
