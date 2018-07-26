var { sendEmail, routeDefault } = require('./../src/config/routes');
var request = require('request');

describe('Starter with tests', () => {
    it('Should return true', () => {
        expect(true).toBe(true);
    });
});

describe('Routes methods', () => {
    let server = 'http://localhost:3333/starter';
    it('Should return ok message by default', (done) => {
        request(server, (error, response, body) => {
            expect(response.statusCode).toBe(200);
            done(); 
        })
    });
});