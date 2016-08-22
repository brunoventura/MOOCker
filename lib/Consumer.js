'use strict';

const log = require('./Logs');

class Consumer {

    constructor(source) {
        this.source = source;
    }

    get courses() {
        log.info(`[Consuming] ${this.source.name} - Started`);
        const courses = this.loadCourses();
        return courses.tap(loadedCourses => {
            const msg = `[Consuming] ${this.source.name} - Ended | Loaded ${loadedCourses.length} Courses`;
            log.info(msg);
        });
    }

    loadCourses() {}

}

module.exports = Consumer;
