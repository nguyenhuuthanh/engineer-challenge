let chai = require('chai');
const assert = require('chai').assert
const expect = require('chai').expect

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';


const getTable = require('../controllers/chartController').getTable;
const generateChart = require('../controllers/chartController').generateChart;

describe('Test getting data table form URL', function() {
	it('getTable should return type array', function() {
		const url = 'https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression';
		return getTable(url).then(
			function(result) {
				expect(result).to.be.a('array')
			}
		)
	})


	it('generateChart should return URL type string', async () => {
		const url = 'https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression';
		const data = await getTable(url);
		const result = await generateChart(data);
		expect(result).to.be.a('string')
	})
})
