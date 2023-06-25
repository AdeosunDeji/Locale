import supertest from 'supertest'
import createServer from '../../app'
import config from '../../config';
import { generateApiKey } from "../../utils/generteApiKey";

const app = createServer();

describe('Welcome route', ()=> {

  it('shows welcome route works', async () => {
    const response = await supertest(app).get("/")
    expect(response.status).toBe(200)
    expect(response.text).toEqual(`Welcome to ${config.APP_NAME}`)
  });

})


describe('generateApiKey', () => {

  it('should generate api key of a specified length', () => {
    const length = 10;
    const apiKey = generateApiKey(length);

    expect(apiKey.length).toBe(length)
  });


  it('should only contain certain characters from the given character set', () => {
    const length = 20;
    const apiKey = generateApiKey(length);
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < apiKey.length; i++) {
      expect(characters.includes(apiKey[i])).toBe(true);
    }
  });

});

