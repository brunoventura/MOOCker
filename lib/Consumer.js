'use strict';

const Course = require('./CourseModel');

class Consumer {

    constructor(source) {
        this.source = source;
    }

    get courses() {
        console.log(`Consuming [${this.source.name}] Started`);
        const courses = this.loadCourses();
        return courses.tap(courses => {
            let msg = `Consuming [${this.source.name}] Ended - `
            msg += `Loaded ${courses.length} Courses`;
            console.log(msg);
        });
    }

    loadCourses() {}

}

module.exports = Consumer;
