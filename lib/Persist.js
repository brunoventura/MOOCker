'use strict';

const fs = require('fs');
const _ = require('lodash');
const Promise = require('bluebird');
const indexator = require('./Indexator');
const cachePath = './generated/courses.json';

const persist = function(itemsBySource) {
    const courses = loadCourses();
    const newCourses = [];
    const updatedCourses = [];

    itemsBySource.forEach(course => {
        const source = course.source;
        const sourceId = course.sourceId;
        const cachedCourse = courses[source] && courses[source][sourceId];

        if (!cachedCourse) {
            newCourses.push(course);
        } else if (getDifference(course, cachedCourse).length > 0) {
            updatedCourses.push(course)
        }

        merge(courses, course);
    });
    return Promise.all([
        indexator.create(newCourses),
        indexator.update(updatedCourses)
    ])
    .spread(created => {
        saveCourses(courses);
        return itemsBySource;
    });
};

const merge = function(map, item) {
    // { [item.source]: {} } is needed to not lose the item reference...
    return _.merge(map, { [item.source]: {} }, {[item.source]: { [item.sourceId]: item } });
};

const getDifference = function(a, b) {
    const ignoredKeys = new Set(['objectID']);

    return _.reduce(a, (result, value, key) => {
        if (ignoredKeys.has(key) || _.isEqual(value, b[key])) {
            return result;
        }

        return result.concat(key);
    }, []);
};

const loadCourses = function() {
    try {
        const courses = JSON.parse(fs.readFileSync(cachePath));
        return courses;
    } catch (e) {
        console.log("> No data loaded <");
    }

    return {};
};

const saveCourses = function(courses) {
    fs.writeFileSync(cachePath, JSON.stringify(courses, null, 4));
};

module.exports = persist;
