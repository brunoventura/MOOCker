'use strict';

const fs = require('fs');
const _ = require('lodash');
const Promise = require('bluebird');
const indexator = require('./Indexator');

const persist = function(itemsBySource) {
    return indexator.backup()
        .then(arrayToMap)
        .then(backup => {
            const newCourses = [];
            const updatedCourses = [];

            itemsBySource.forEach(course => {
                const source = course.source;
                const sourceId = course.sourceId;
                const cachedCourse = backup[source] && backup[source][sourceId];

                if (!cachedCourse) {
                    newCourses.push(course);
                } else if (getDifference(course, cachedCourse).length > 0) {
                    course.objectID = cachedCourse.objectID;
                    updatedCourses.push(course);
                }
            });

            return Promise.all([
                itemsBySource,
                indexator.create(newCourses),
                indexator.update(updatedCourses)
            ]);
        });
};

const arrayToMap = function(coursesArray) {
    const map = {};
    coursesArray.forEach(course => {
        merge(map, course);
    });
    return map;
}

const arrayToMapCompare = function(coursesArray) {
    const map = {};
    coursesArray.forEach(course => {
        merge(map, course);
    });
    return map;
}


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

module.exports = persist;
