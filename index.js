'use strict';

const Request = require('bluebird');
const _ = require('lodash');
const fs = require('fs');

const veduca = require('./lib/plugins/veduca');
const coursera = require('./lib/plugins/coursera');

const sources = [coursera, veduca];

Request.map(sources, source => {
    return source.courses;
})
.then(data => _.flatten(data))
.then(data => {
    fs.writeFileSync('./static/courses.json', JSON.stringify(data, null, 4));
});
