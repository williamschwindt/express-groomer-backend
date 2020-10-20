const request = require('supertest');
const express = require('express');
const Groomers = require('../../api/groomers/groomersModel');
const groomersRouter = require('../../api/groomers/groomersRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/groomers/groomersModel');
// mock the auth middleware completely
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

describe('groomers router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use('/groomers', groomersRouter);
    jest.clearAllMocks();
  });

  describe('GET /groomers', () => {
    it('should return 200', async () => {
      Groomers.findAll.mockResolvedValue([]);
      const res = await request(server).get('/groomers');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(Groomers.findAll.mock.calls.length).toBe(1);
    });
  });

  describe('GET /groomers/:id', () => {
    it('should return 200 when profile found', async () => {
      Groomers.findById.mockResolvedValue({
        id: 1,
        name: 'Louie',
        lastname: 'Smith',
        description: 'fdasdfasdfas fasd asdf as ',
        address: '23 Hellen Rd',
        zip: '23442552',
        phone: '3453556636',
        email: 'louie@example.com',
        city: 'Atlanta',
        state: 'Georgia',
        country: 'USA',
        photo_url: 'https://someplace.com/pic.jpg',
        walk_rate: '1200',
        day_care_rate: '14000',
        vet_visit_rate: '1200',
      });
      const res = await request(server).get('/groomers/1');

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Louie');
      expect(res.body.lastname).toBe('Smith');
      expect(res.body.address).toBe('23 Hellen Rd');
      expect(res.body.zip).toBe('23442552');
      expect(res.body.phone).toBe('3453556636');
      expect(res.body.city).toBe('Atlanta');
      expect(res.body.state).toBe('Georgia');
      expect(res.body.country).toBe('USA');
      expect(res.body.photo_url).toBe('https://someplace.com/pic.jpg');
      expect(res.body.walk_rate).toBe('1200');
      expect(res.body.day_care_rate).toBe('14000');
      expect(res.body.vet_visit_rate).toBe('1200');
      expect(Groomers.findById.mock.calls.length).toBe(1);
    });

    it('should return 404 when no user found', async () => {
      Groomers.findById.mockResolvedValue();
      const res = await request(server).get('/groomers/1');

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('the groomer with that id does not exist');
    });
  });

  describe('POST /groomers', () => {
    it('should return 200 when profile is created', async () => {
      const groomer = {
        oktaId: null,
        name: 'John',
        lastname: 'Doe',
        description: 'fdasdfasdfas fasd asdf as',
        address: '2 Cassiopeia Rd',
        zip: '23485552',
        phone: '3453796636',
        email: 'john@example.com',
        city: 'Atlanta',
        state: 'Georgia',
        country: 'USA',
        photo_url: 'https://someplace.com/pic.jpg',
      };
      Groomers.findById.mockResolvedValue(undefined);
      Groomers.create.mockResolvedValue([
        Object.assign({ id: '1000' }, groomer),
      ]);
      const res = await request(server).post('/groomers').send(groomer);
      console.log(groomer);

      expect(res.status).toBe(201);
      expect(res.body.groomers.id).toBe('1000');
      expect(Groomers.create.mock.calls.length).toBe(1);
    });
  });

  describe('PUT /groomers', () => {
    it('should return 200 when profile is created', async () => {
      Groomers.findById.mockResolvedValue({
        id: 1,
        name: 'Louie',
        lastname: 'Smith',
        description: 'fdasdfasdfas fasd asdf as ',
        address: '23 Hellen Rd',
        zip: '23442552',
        phone: '3453556636',
        email: 'louie@example.com',
        city: 'Atlanta',
        state: 'Georgia',
        country: 'USA',
        photo_url: 'https://someplace.com/pic.jpg',
        walk_rate: '1200',
        day_care_rate: '14000',
        vet_visit_rate: '1200',
      });
      const groomer = {
        name: 'OtherName',
      };
      Groomers.findById.mockResolvedValue(groomer);
      Groomers.update.mockResolvedValue([groomer]);

      const res = await request(server).put('/groomers/1').send(groomer);
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('OtherName');
      expect(Groomers.update.mock.calls.length).toBe(1);
    });
  });
});
