const express = require('express');
const authRequired = require('../middleware/authRequired');
const Profiles = require('./petsmodel.js');
const router = express.Router();

router.get('/', authRequired, function (req, res) {
  Pets.findAll()
    .then((pets) => {
      res.status(200).json(pets);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});


router.get('/:id', authRequired, function (req, res) {
  const id = String(req.params.id);
  Pets.findById(id)
    .then((pets) => {
      if (pets) {
        res.status(200).json(pets);
      } else {
        res.status(404).json({ error: 'PetNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', authRequired, async (req, res) => {
  const pet = req.body;
  if (pets) {
    const id = pets.id || 0;
    try {
      await Pet.findById(id).then(async (pet) => {
        if (pet == undefined) {
          //profile not found so lets insert it
          await Pets.create(pet).then((pet) =>
            res
              .status(200)
              .json({ message: 'pet created', pet: pet[0] })
          );
        } else {
          res.status(400).json({ message: 'pet already exists' });
        }
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: 'Pet missing' });
  }
});

router.put('/', authRequired, function (req, res) {
  const pet = req.body;
  if (pets) {
    const id = profile.id || 0;
    Pets.findById(id)
      .then(
        Pets.update(id, pets)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'pet created', pet: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update pet '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find pet '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete('/:id', authRequired, function (req, res) {
  const id = req.params.id;
  try {
    Pets.findById(id).then((pet) => {
      Pets.remove(pet.id).then(() => {
        res
          .status(200)
          .json({ message: `Profile '${id}' was deleted.`, pet: pet });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete pet with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
