
const path = require('path');
const fs = require('fs/promises');
const cheerio = require('cheerio');
const axios = require('axios');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

async function generateChart(data) {
	const chartName = `chartImage_${new Date().getTime()}.png`;
	const chartDownloadUrl = path.resolve(__dirname + `/../public/charts/${chartName}`);
	const width = 500;
	const height = 500;
	const chartLabels = [];
	const chartData = [];

	data.forEach(item => {
		chartLabels.push(item[1]);
		chartData.push(parseFloat(item[0].split('m (')[0]))
	})

	const configuration = {
		type: 'bar',
		data: {
			labels: chartLabels,
			datasets: [{
				label: 'Export Chart',
				data: chartData,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
		},
		plugins: [{
			id: 'background-colour',
			beforeDraw: (chart) => {
				const ctx = chart.ctx;
				ctx.save();
				ctx.fillStyle = 'white';
				ctx.fillRect(0, 0, width, height);
				ctx.restore();
			}
		}]
	};
	const chartCallback = (ChartJS) => {
		ChartJS.defaults.responsive = true;
		ChartJS.defaults.maintainAspectRatio = false;
	};
	const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });
	const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);
 	await fs.writeFile(chartDownloadUrl, buffer, 'base64');

	return chartName;
}

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
	const { url } = req.query;
	if (!url) {
		res.end('Missing URL');
	}
	const data = await getTable(url);
	const chartName = await generateChart(data);
	res.send(`<a href="/charts/${chartName}">Chart URL</a>`)
}

module.exports = { getIndex }