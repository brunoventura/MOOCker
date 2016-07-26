'use strict';

const dotenv = require('dotenv').config();
const Promise = require('bluebird');
const _ = require('lodash');
const fs = require('fs');
const indexator = require('./lib/Indexator');
const persist = require('./lib/Persist');

const veduca = require('./lib/plugins/veduca');
const coursera = require('./lib/plugins/coursera');
const edx = require('./lib/plugins/edx');

const sources = [coursera, veduca, edx];
console.log('> Mooc Consumer Starting <')
Promise.map(sources, source => source.courses)
    .then(_.flatten)
    .then(persist)
    .then(courses => {
        console.log(`> Mooc Consumer Ended - ${courses.length} Courses Loaded <`);
    })
    .catch(err => console.log(`Aborted, error consuming, try again: ${err}`));
