'use strict';

class Consumer {

    constructor(source) {
        this.source = source;
    }

    get courses() {
        console.log(`Consuming [${this.source.name}] Started`);
        const courses = this.loadCourses();
        return courses.tap(loadedCourses => {
            const msg = `Consuming [${this.source.name}] Ended - Loaded ${loadedCourses.length} Courses`;
            console.log(msg);
        });
    }

    loadCourses() {}

}

module.exports = Consumer;
