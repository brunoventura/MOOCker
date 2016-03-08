'use strict';

class Consumer {

    get courses() {
        return this.loadCourses();
    }

    get source() {
        return this.loadSource();
    }

    loadCourses() {}
    loadSource() {}

}

module.exports = Consumer;
