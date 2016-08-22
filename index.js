'use strict';

const dotenv = require('dotenv');
const Promise = require('bluebird');
const _ = require('lodash');
const log = require('./lib/Logs');
const persist = require('./lib/Persist');
const veduca = require('./lib/plugins/veduca');
const coursera = require('./lib/plugins/coursera');
const edx = require('./lib/plugins/edx');
dotenv.config();

const sources = [coursera, veduca, edx];
log.info('> Mooc Consumer Starting <');
Promise.map(sources, source => source.courses)
    .then(_.flatten)
    .then(persist)
    .spread((courses, updated, created) => {
        console.log(`[Counts] Total Courses - ${courses.length}`);
        console.log(`[Counts] New Courses - ${created.length}`);
        console.log(`[Counts] Updated Courses - ${updated.length}`);
        console.log('> Mooc Consumer Ended <');
    })
    .catch(err => log.error(`Some source appresented error: ${err}`));
