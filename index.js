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
        log.info(`[Counts] Total Courses - ${courses.length}`);
        log.info(`[Counts] New Courses - ${created.length}`);
        log.info(`[Counts] Updated Courses - ${updated.length}`);
        log.info('> Mooc Consumer Ended <');
    })
    .catch(err => log.error(`Some source appresented error: ${err}`));
