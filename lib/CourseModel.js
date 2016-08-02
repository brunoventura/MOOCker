'use strict';

const Joi = require('joi');

const types = ['self-paced', 'free-class', 'time-lapse'];
const courseModel = Joi.object().keys({
    name: Joi.string().required(),
    startDate: Joi.date().timestamp(),
    type: Joi.string().equal(types).required(),
    link: Joi.string().uri().required(),
    image: Joi.string().uri().required(),
    source: Joi.string().required(),
    sourceId: Joi.string().required()
});

class CourseModel {
    constructor(course) {
        this.validate(course);
        Object.assign(this, course);
    }

    validate(course) {
        Joi.validate(course, courseModel, (err, value) => {
            if (err) throw new Error(err);
            return value;
        });
    }
}


module.exports = CourseModel;
