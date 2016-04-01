'use strict';
const request = require('request');
const slug = require('slug');
const Promise = require('bluebird');

const Consumer = require('../Consumer');
const Course = require('../CourseModel');

class VeducaConsumer extends Consumer {

    constructor() {
        super({
            name: 'Veduca',
            link: 'http://www.veduca.com.br',
            id: 'veduca'
        })
    }

    loadCourses() {
        var q = new Promise((resolve, reject) => {
            request('http://apiv3.veduca.com.br/api/v3/programas?programType=mooc',
            (err, res, body) => {
                if (err || res.statusCode == 503) return reject('Problem consuming');
                const data = JSON.parse(body);

                resolve(data.map(course => new Course({
                    name: course.title,
                    type: 'self-paced',
                    link: `http://www.veduca.com.br/cursos/gratuitos/${slug(course.og_name)}`,
                    image: `http://cdn.veduca.com.br/uploads/program/${course.id}/${course.id}.jpg`,
                    source: 'veduca'
                })));
            })
        })
        return q;
    }

}

module.exports = new VeducaConsumer();
