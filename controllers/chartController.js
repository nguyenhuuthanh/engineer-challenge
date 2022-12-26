const cheerio = require('cheerio');
const axios = require('axios');


async function getTable(url) {
  try {
    const { data } = await axios({
      method: "GET",
      url: url,
    })

    const $ = cheerio.load(data)
    const elemSelector =  $('table').first()

		const tableHeader = elemSelector.find('th').map(function() {return $(this).text().trim();}).toArray();

		// console.log(tableHeader.length);

		// return $('table').first().text();

		// gets table cell values; loops through all tr rows
		const tableData = elemSelector.find('tbody tr').map(function(tr_index) {
			// gets the cells value for the row; loops through each cell and returns an array of values
			var cells = $(this).find('td').map(function() {
				return /\d/.test($(this).text().trim()) ? $(this).text().trim() : '';
			}).toArray();


			// returns an array of the cell data generated
			return [cells.filter(function(item) {return item.length;})];
			// the filter removes empty array items
		}).toArray().filter(function(item) {return item.length;});

		return tableData;

  } catch (err) {
    console.error(err)
  }
}

const getIndex = async (req, res) => {
	const url = 'https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression';
	const dataTable = await getTable(url);

	res.send(dataTable);
}

module.exports = { getIndex }