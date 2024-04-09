import request from 'supertest';
import app from '../server'; // Import your Express app

describe('GET /kpis/kpis', () => {


    it('should return 200 & valid response if request is valid', async () => {
        const res = await request(app)
            .get('/kpi/kpis')
            .send();
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
        // Add more assertions as necessary
    });

});


describe('POST /kpis', () => {
    it('should return 201 & valid response if request is valid', async () => {
        const kpiData = {
            totalProfit: '$212000.00', // replace with actual data
        };

        const res = await request(app)
            .post('/kpi/kpis')
            .send(kpiData);

        expect(res.status).toBe(201);
        // Add more assertions as necessary, for example checking the response body
    });

    it('should return 404 if there is an error', async () => {
        const kpiData = {
            totalProfit: '10000', // replace with actual data
        };

        // Here you might mock the KPIModel.create method to throw an error
        const res = await request(app)
            .post('/kpis')
            .send(kpiData);

        expect(res.status).toBe(404);
        // Add more assertions as necessary
    });
})