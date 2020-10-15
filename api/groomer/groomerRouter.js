const express = require('express');
// const authRequired = require('../middleware/authRequired');
const Groomers = require('./groomerModel');
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Groomer:
 *      type: object
 *      required:
 *        - id
 *        - email
 *        - name
 *        - avatarUrl
 *      properties:
 *        id:
 *          type: string
 *          description: This is a foreign key (the okta user ID)
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        avatarUrl:
 *          type: string
 *          description: public url of groomer avatar
 *      example:
 *        id: '1'
 *        email: 'frank@example.com'
 *        name: 'Frank Martinez'
 *        avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *
 * /groomers:
 *  get:
 *    description: Returns a list of groomers
 *    summary: Get a list of all groomers
 *    security:
 *      - okta: []
 *    tags:
 *      - groomer
 *    responses:
 *      200:
 *        description: array of groomers
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Groomer'
 *              example:
 *                - id: '1'
 *                  email: 'frank@example.com'
 *                  name: 'Frank Martinez'
 *                  avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *                - id: '013e4ab94d96542e791f'
 *                  email: 'cathy@example.com'
 *                  name: 'Cathy Warmund'
 *                  avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/geneseleznev/128.jpg'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
// authRequired
router.get('/', function (req, res) {
  Groomers.findAll()
    .then((groomers) => {
      res.status(200).json(groomers);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

/**
 * @swagger
 * components:
 *  parameters:
 *    groomerId:
 *      name: id
 *      in: path
 *      description: ID of the groomer to return
 *      required: true
 *      example: 1
 *      schema:
 *        type: string
 *
 * /groomer/{id}:
 *  get:
 *    description: Find groomers by ID
 *    summary: Returns a single groomer
 *    security:
 *      - okta: []
 *    tags:
 *      - groomer
 *    parameters:
 *      - $ref: '#/components/parameters/groomerId'
 *    responses:
 *      200:
 *        description: A groomer object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Groomer'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Groomer not found'
 */
// authRequired
router.get('/:id', function (req, res) {
  const id = String(req.params.id);
  Groomers.findById(id)
    .then((groomer) => {
      if (groomer) {
        res.status(200).json(groomer);
      } else {
        res.status(404).json({ error: 'GroomerNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

/**
 * @swagger
 * /groomer:
 *  post:
 *    summary: Add a groomer
 *    security:
 *      - okta: []
 *    tags:
 *      - groomer
 *    requestBody:
 *      description: Groomer object to to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Groomer'
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Groomer not found'
 *      200:
 *        description: A groomer object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: groomer created
 *                groomer:
 *                  $ref: '#/components/schemas/Groomer'
 */
// authRequired
router.post('/', async (req, res) => {
  const groomer = req.body;
  if (groomer) {
    const id = groomer.id || 0;
    try {
      await Groomers.findById(id).then(async (pf) => {
        if (pf == undefined) {
          //groomer not found so lets insert it
          await Groomers.create(groomer).then((groomer) =>
            res
              .status(200)
              .json({ message: 'groomer created', groomer: groomer[0] })
          );
        } else {
          res.status(400).json({ message: 'groomer already exists' });
        }
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: 'Groomer missing' });
  }
});
/**
 * @swagger
 * /groomer:
 *  put:
 *    summary: Update a groomer
 *    security:
 *      - okta: []
 *    tags:
 *      - groomer
 *    requestBody:
 *      description: Groomer object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Groomer'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A groomer object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: groomer created
 *                groomer:
 *                  $ref: '#/components/schemas/Groomer'
 */
// authRequired
router.put('/', function (req, res) {
  const groomer = req.body;
  if (groomer) {
    const id = groomer.id || 0;
    Groomers.findById(id)
      .then(
        Groomers.update(id, groomer)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'groomer created', groomer: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update groomer '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find groomer '${id}'`,
          error: err.message,
        });
      });
  }
});
/**
 * @swagger
 * /groomer/{id}:
 *  delete:
 *    summary: Remove a groomer
 *    security:
 *      - okta: []
 *    tags:
 *      - groomer
 *    parameters:
 *      - $ref: '#/components/parameters/groomerId'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A groomer object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Groomer '1' was deleted.
 *                groomer:
 *                  $ref: '#/components/schemas/Groomer'
 */

// authRequired
router.delete('/:id', function (req, res) {
  const id = req.params.id;
  try {
    Groomers.findById(id).then((groomer) => {
      Groomers.remove(groomer.id).then(() => {
        res
          .status(200)
          .json({ message: `Groomer '${id}' was deleted.`, groomer: groomer });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete groomer with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
