const request = require('supertest');
const express = require('express');
const Pets = require('../../api/pets/petsmodel');
const petsrouter = require('../../api/pets/petsrouter');
const server = express();
server.use(express.json());

jest.mock('../../api/pets/potsmodel');
// mock the auth middleware completely
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

describe('pets router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use(['/pets', '/pets'], petsrouter);
    jest.clearAllMocks();
  });

  describe('GET /pets', () => {
    it('should return 200', async () => {
      Pets.findAll.mockResolvedValue([]);
      const res = await request(server).get('/pets');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(Pets.findAll.mock.calls.length).toBe(1);
    });
  });

  describe('GET /pets/:id', () => {
    it('should return 200 when pet found', async () => {
      Pets.findById.mockResolvedValue({
        id: 'd376de0577681ca93614',
        name: 'Chuckee',
        description: 'Pug breed with no medical conditions',
        photo_url:
          'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg',
      });
      const res = await request(server).get('/pets/d376de0577681ca93614');

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Bob Smith');
      expect(Pets.findById.mock.calls.length).toBe(1);
    });

    it('should return 404 when no user found', async () => {
      Pets.findById.mockResolvedValue();
      const res = await request(server).get('/pets/d376de0577681ca93614');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('PetNotFound');
    });
  });

  describe('POST /pet', () => {
    it('should return 200 when pets is created', async () => {
      const pet = {
        name: 'Chuckee',
        description: 'Pug breed with no medical conditions',
        photo_url:
          'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg',
      };
      Pets.findById.mockResolvedValue(undefined);
      Pets.create.mockResolvedValue([
        Object.assign({ id: 'd376de0577681ca93614' }, pet),
      ]);
      const res = await request(server).post('/pets').send(pet);

      expect(res.status).toBe(200);
      expect(res.body.pet.id).toBe('d376de0577681ca93614');
      expect(Pets.create.mock.calls.length).toBe(1);
    });
  });

  describe('PUT /pets', () => {
    it('should return 200 when pet is created', async () => {
      const pet = {
        id: 'd376de0577681ca93614',
        name: 'Louie Smith',
        description: 'This is updated test on pet',
        photo_url:
          'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg',
      };
      Pets.findById.mockResolvedValue(pet);
      Pets.update.mockResolvedValue([pets]);

      const res = await request(server).put('/pets/').send(pet);
      expect(res.status).toBe(200);
      expect(res.body.pet.name).toBe('Louie Smith');
      expect(Pets.update.mock.calls.length).toBe(1);
    });
  });
});