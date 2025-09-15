const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes');

// We need to set up a minimal express app to test the routes
const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

describe('User Authentication API', () => {

  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.name).toBe('Test User');
  });

  it('should not register a user with an existing email', async () => {
    // First, register a user
    await request(app)
      .post('/api/users/register')
      .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });

    // Then, try to register with the same email
    const res = await request(app)
      .post('/api/users/register')
      .send({ name: 'Another User', email: 'test@example.com', password: 'password456' });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('User already exists');
  });

  it('should log in an existing user successfully', async () => {
    // First, register a user
     await request(app)
      .post('/api/users/register')
      .send({ name: 'Test User', email: 'login@example.com', password: 'password123' });

    // Then, log in with those credentials
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'login@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});