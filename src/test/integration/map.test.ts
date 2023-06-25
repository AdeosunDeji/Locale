import request from 'supertest'
import { connect, cleanData, disconnect } from '../../helper/mongodb.memory.test.helper'
import createServer from '../../app'
import { user1 } from './userdata';

const app = createServer(); 


describe('Locator Route', () => {
  beforeAll(connect)
  beforeEach(cleanData)
  afterAll(disconnect)

  it('should return full info on all states', async () => {
    const user = await request(app)
      .post("/api/v1/users/register")
      .send(user1);
  
    const apiKey = user.body.data.apiKey;

    const response = await request(app)
    .post("/api/v1/users/login")
      .set('Authorization', apiKey)
      .send({ email: 'ade@gmail.com', password: 'adeosun' });
  
    expect(response.statusCode).toBe(200);

    const response2 = await request(app)
    .get("/api/v1/states")
    .set('Authorization', apiKey);

    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response2.statusCode).toBe(200)
    expect(response2.body.message).toBe('All states');
  });

  it('Should return info on specific state searched', async () => {
    const user = await request(app)
      .post("/api/v1/users/register")
      .send(user1);
  
    const apiKey = user.body.data.apiKey;

    const response = await request(app)
    .post("/api/v1/users/login")
      .set('Authorization', apiKey)
      .send({ email: 'ade@gmail.com', password: 'adeosun' });
  
    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response.statusCode).toBe(200)

    const response2 = await request(app)
    .get("/api/v1/states/state")
    .query({ name: "ekiti" })
    .set('Authorization', apiKey);

    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response2.statusCode).toBe(200)
    expect(response2.body.message).toBe("State: ")
  });

  it('Should return error if a state does not exist', async () => {
    const user = await request(app)
      .post("/api/v1/users/register")
      .send(user1);
  
    const apiKey = user.body.data.apiKey;

    const response = await request(app)
    .post("/api/v1/users/login")
      .set('Authorization', apiKey)
      .send({ email: 'ade@gmail.com', password: 'adeosun' });
  
      expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
      expect(response.statusCode).toBe(200);

    const response2 = await request(app)
    .get("/api/v1/states/state")
    .query({ name: "carliifonia" })
    .set('Authorization', apiKey);

    expect(response2.statusCode).toBe(404)
    expect(response2.body.error).toBe("State not found")
  });

  it('Should return states by the region they are located', async () => {
    const user = await request(app)
      .post("/api/v1/users/register")
      .send(user1);
  
    const apiKey = user.body.data.apiKey;

    const response = await request(app)
    .post("/api/v1/users/login")
      .set('Authorization', apiKey)
      .send({ email: 'ade@gmail.com', password: 'adeosun' });
  
    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response.statusCode).toBe(200);

    const region = "south west";

    const response2 = await request(app)
    .get(`/api/v1/states/${region}`)
    .set('Authorization', apiKey);

    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response2.statusCode).toBe(200);
  });

  it('Should return error if region does not exist', async () => {
    const user = await request(app)
      .post("/api/v1/users/register")
      .send(user1);
  
    const apiKey = user.body.data.apiKey;

    const response = await request(app)
    .post("/api/v1/users/login")
      .set('Authorization', apiKey)
      .send({ email: 'ade@gmail.com', password: 'adeosun' });

    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response.statusCode).toBe(200);

    const region = "southy";

    const response2 = await request(app)
    .get(`/api/v1/states/${region}`)
    .set('Authorization', apiKey);

    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response2.statusCode).toBe(404);
    expect(response2.body.error).toBe("Region not found");
  });


  it('Should return all local governments in a state', async () => {
    const user = await request(app)
      .post("/api/v1/users/register")
      .send(user1);
  
    const apiKey = user.body.data.apiKey;

    const response = await request(app)
    .post("/api/v1/users/login")
      .set('Authorization', apiKey)
      .send({ email: 'ade@gmail.com', password: 'adeosun' });
  
    expect(response.statusCode).toBe(200);

    const state = "lagos";

    const response2 = await request(app)
    .get(`/api/v1/states/area/${state}`)
    .set('Authorization', apiKey);

    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response2.statusCode).toBe(200);
    expect(response2.body.message).toBe(`LGAs in ${state}`)
  });

  it('Should return error if state does not exist', async () => {
    const user = await request(app)
      .post("/api/v1/users/register")
      .send(user1);
  
    const apiKey = user.body.data.apiKey;

    const response = await request(app)
    .post("/api/v1/users/login")
      .set('Authorization', apiKey)
      .send({ email: 'ade@gmail.com', password: 'adeosun' });
    
    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response.statusCode).toBe(200);

    const state = "dubai";

    const response2 = await request(app)
    .get(`/api/v1/states/area/${state}`)
    .set('Authorization', apiKey);

    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response2.statusCode).toBe(404);
    expect(response2.body.error).toBe("LGAs not found.");
  });


  it('Should return info on state or LGA searched ', async () => {
    const user = await request(app)
      .post("/api/v1/users/register")
      .send(user1);
  
    const apiKey = user.body.data.apiKey;

    const response = await request(app)
    .post("/api/v1/users/login")
      .set('Authorization', apiKey)
      .send({ email: 'ade@gmail.com', password: 'adeosun' });
  
    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response.statusCode).toBe(200);

    const response2 = await request(app)
    .get("/api/v1/states/search")
    .query({ query: "badagry"})
    .set('Authorization', apiKey)

    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response2.statusCode).toBe(200)
    expect(response2.body.message).toBe("Search result: ")
  });

  it('Should return error if state or LGA does not exist', async () => {
    const user = await request(app)
      .post("/api/v1/users/register")
      .send(user1);
  
    const apiKey = user.body.data.apiKey;

    const response = await request(app)
    .post("/api/v1/users/login")
      .set('Authorization', apiKey)
      .send({ email: 'ade@gmail.com', password: 'adeosun' });
  
    expect(response.statusCode).toBe(200);

    const response2 = await request(app)
    .get("/api/v1/states/search")
    .query({ query: "new york"})
    .set('Authorization', apiKey)

    expect(response2.statusCode).toBe(404);
    expect(response2.body.error).toBe("No matching result found");
  });


  it('Should return info on state or region searched', async () => {
    const user = await request(app)
      .post("/api/v1/users/register")
      .send(user1);
  
    const apiKey = user.body.data.apiKey;

    const response = await request(app)
    .post("/api/v1/users/login")
      .set('Authorization', apiKey)
      .send({ email: 'ade@gmail.com', password: 'adeosun' });
  
    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response.statusCode).toBe(200);
    
    const name = "north west"

    const response2 = await request(app)
    .get(`/api/v1/states/reg&s/${name}`)
    .set('Authorization', apiKey)

    expect(response2.statusCode).toBe(200);
    expect(response2.body.message).toBe("Search result: ")
  });

  it('Should return error if state or region does not exist', async () => {
    const user = await request(app)
      .post("/api/v1/users/register")
      .send(user1);
  
    const apiKey = user.body.data.apiKey;

    const response = await request(app)
    .post("/api/v1/users/login")
      .set('Authorization', apiKey)
      .send({ email: 'ade@gmail.com', password: 'adeosun' });
  
    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response.statusCode).toBe(200);
    
    const name = "east east"

    const response2 = await request(app)
    .get(`/api/v1/states/reg&s/${name}`)
    .set('Authorization', apiKey)

    expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
    expect(response2.statusCode).toBe(404);
    expect(response2.body.error).toBe("No matching result found");
  });


});