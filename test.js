'use strict';

const dotenv = require('dotenv').config();
const indexator = require('./lib/Indexator');

indexator.backup().then(console.log)
