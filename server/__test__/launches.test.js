const request = require('supertest');
const app =  require('../src/app');



describe('test GET / launches', () => { 

    test('it should response with 200 response code', async () => { 
        const response = await request(app).get('/launches').expect(200);
    });    
}
);

describe('test POST / launches', () => {
    const testData = {
        destination: 'Earth',
        launchDate: '2020-01-01',
        rocket: 'Falcon 9',
        mission: 'SpaceX'
    };
    test('it should responde with 201 success code ', async () => {
        const response = await request(app).post('/launches').send(testData).expect(201);
    })
    
    test('it should catch missing required properties ', async () => {
        delete testData.destination;
        const response = await request(app).post('/launches').send(testData).expect(400);
        expect(response.body).toStrictEqual({
            error: 'Missing required field'
        })
      }
    )   
        const testDataWithInvalidDate = {
            destination: 'Earth',
            launchDate: 'something crazy',
            rocket: 'Falcon 9',
            mission: 'SpaceX'
        }
    test('it should catch invalid date format ', async () => {
        const response = await request(app).post('/launches').send(testDataWithInvalidDate).expect(400);
        expect(response.body).toStrictEqual({
            error: 'Invalid date'})
    } )
} );