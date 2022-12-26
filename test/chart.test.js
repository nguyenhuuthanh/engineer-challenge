let chai = require('chai');
const assert = require('chai').assert
const expect = require('chai').expect
const should = require('chai').should
let chaiHttp = require('chai-http');


//During the test the env variable is set to test
process.env.NODE_ENV = 'test';


chai.use(chaiHttp);
let server = require('../server');
describe('Chart', () => {

	/*
	 * Test the /Chart route
	 */
	describe('/GET chart', () => {
			it('it should GET text Missing URL', (done) => {
					chai.request(server)
						.get('/chart')
						.end((err, res) => {
							expect(res.text).to.equal('Missing URL');
							done();
						});
			});

			it('it should GET chart URL', (done) => {
				chai.request(server)
					.get('/chart?url=https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression')
					.end((err, res) => {
						expect(res.text).to.have.string('<a href="/charts/chartImage_');
						done();
					});
		});
	});
});