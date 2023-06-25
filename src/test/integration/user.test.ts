import request from 'supertest'
import { connect, cleanData, disconnect } from '../../helper/mongodb.memory.test.helper'
import createServer from '../../app'
import { user1, user2, user3, user4 } from './userdata';

const app = createServer(); 


describe('User Route', () => {
  beforeAll(connect)
  beforeEach(cleanData)
  afterAll(disconnect)

  it('should create new user', async () => {
    const response = await request(app).post("/api/v1/users/register")
    .send(user1)

    expect(user1).toHaveProperty("email")
    expect(user1).toHaveProperty("firstName")
    expect(user1).toHaveProperty("lastName")
    expect(user1).toHaveProperty("password")
    expect(response.text).toMatch("apiKey")
    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response.statusCode).toBe(201)
    expect(response.body.message).toBe("Account created successfully, kindly login.")
  })

  it('should not create user if firstname is missing', async() => {
    const response = await request(app).post("/api/v1/users/register")
    .send(user2)
    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe("Firstname is required.");
  })

  it('should not create user if lastname is missing', async() => {
    const response = await request(app).post("/api/v1/users/register")
    .send(user3)
    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe("Lastname is required.");
  })

  it('should not create user if email is missing', async() => {
    const response = await request(app).post("/api/v1/users/register")
    .send(user4)
    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe("email is required.");
  })

  it('should log in a user with apiKey authorization', async () => {
    const user = await request(app)
    .post("/api/v1/users/register")
      .send(user1);
  
    const apiKey = user.body.data.apiKey;

    const response = await request(app)
    .post("/api/v1/users/login")
      .set('Authorization', apiKey)
      .send({ email: 'ade@gmail.com', password: 'adeosun' });
  
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("User logged in successfully.")
  });


 it('should not login a user without apiKey', async() => {
      const response = await request(app)
      .post("/api/v1/users/login")
      .send({ email: 'ade@gmail.com', password: 'adeosun' });
    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response.statusCode).toBe(401);
  })


})