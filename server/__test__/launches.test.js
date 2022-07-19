const request = require('supertest');
const app =  require('../src/app');
const {connectMongo, disconnectMongo} = require('../src/services/mongo');





describe('Connect mongo' , () => {

    beforeAll( async() => {
        await connectMongo();
    })
    
    afterAll( async() => {
        await disconnectMongo();
    })


    
    describe('test GET / launches', () => { 

        test('it should response with 200 response code', async () => { 
            const response = await request(app).get('/v1/launches').expect(200);
        });    
    }
    );
    
    describe('test POST / launches', () => {
        const testData = {

            target: 'Earth',
            launchDate: '2020-01-01',
            rocket: 'Falcon 9',
            mission: 'SpaceX'
        };
        test('it should responde with 201 success code ', async () => {
            const response = await request(app).post('/v1/launches').send(testData).expect(201);
        })

        test('it should catch missing required properties ', async () => {
            delete testData.target;
            const response = await request(app).post('/v1/launches').send(testData).expect(400);
            expect(response.body).toStrictEqual({
                error: 'Missing required field'
            })
          }
        )   

            const testDataWithInvalidDate = {
                target: 'Earth',
                launchDate: 'something crazy',
                rocket: 'Falcon 9',
                mission: 'SpaceX'
            }
        test('it should catch invalid date format ', async () => {
            const response = await request(app).post('/v1/launches').send(testDataWithInvalidDate).expect(400);
            expect(response.body).toStrictEqual({
                error: 'Invalid date'})
        } )
    } );

})


