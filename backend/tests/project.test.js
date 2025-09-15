const request = require('supertest');
const express = require('express');
const projectRoutes = require('../routes/projectRoutes');
const userRoutes = require('../routes/userRoutes');
const { protect } = require('../middleware/authMiddleware');

const app = express();
app.use(express.json());
// We need user routes to log in and get a token
app.use('/api/users', userRoutes); 
app.use('/api/projects', projectRoutes);

describe('Project API', () => {
  let token;

  // Before running project tests, register and log in a user to get a token
  beforeEach(async () => {
    await request(app)
      .post('/api/users/register')
      .send({ name: 'Project Owner', email: 'owner@example.com', password: 'password' });
    
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'owner@example.com', password: 'password' });
    
    token = res.body.token;
  });

  it('should not allow an unauthenticated user to create a project', async () => {
    const res = await request(app)
      .post('/api/projects')
      .send({ title: 'A new project' });

    // Without a token, it should fail
    // Note: This requires your actual middleware, so this test is more of an integration test
    // For a pure unit test, you would "mock" the middleware. But this is great for this assignment.
    expect(res.statusCode).toEqual(401); 
  });

  it('should allow an authenticated user to create a project', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`) // Set the auth header
      .send({
        title: 'My First Awesome Project',
        description: 'This is a test project.',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('My First Awesome Project');
  });
});