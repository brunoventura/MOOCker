'use strict';

const Request = require('bluebird');
const _ = require('lodash');
const fs = require('fs');

const veduca = require('./lib/plugins/veduca');
const coursera = require('./lib/plugins/coursera');
const edx = require('./lib/plugins/edx');

const sources = [coursera, veduca, edx];

console.log('> Mooc Consumer Starting <')

Request.map(sources, source => {
    return source.courses;
})
.then(data => _.flatten(data))
.then(data => {
    console.log(`> Mooc Consumer Ended - ${data.length} Courses Loaded <`);
    fs.writeFileSync('./static/courses.json', JSON.stringify(data, null, 4));
})
.catch(err => console.log('Aborted, error consuming, try again.'));
