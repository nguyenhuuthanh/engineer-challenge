# Detector Inspector Software Engineer Challenge

Thank you for taking the time to complete this challenge. It helps us understand your experience and the way you approach and solve problems.

Please read the [CHALLENGE](CHALLENGE.md) document for the details of the challenge task.

## Getting started

I will use NodeJS with ExpressJS framework to implement the feature.

Current version:
- Node: 16.13.2
- Npm: 9.2.0
- Yarn: 1.22.10

### General solution:
1. Use a library (request) to fetch the HTML content of the Wikipedia page.

2. Use a library (cheerio) to parse the HTML and select the table element on the page.

3. Iterate through the rows of the table and extract the values from the numeric column.

4. Use a library(chartjs) to create a graph of the values.

5. Use the a library (canvas) to render the graph as an image.

6. Save the image to a file using a library (fs).

## Submitting

