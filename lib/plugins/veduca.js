'use strict';
const request = require('request');
const slug = require('slug');

const Consumer = require('../Consumer');
const Course = require('../CourseModel');

class VeducaConsumer extends Consumer {

    loadCourses() {
        var q = new Promise((resolve, reject) => {
            request('http://apiv3.veduca.com.br/api/v3/programas?programType=mooc',
            (err, res, body) => {
                if (err) reject(err);
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

    loadSource() {
        return {
            name: 'Veduca',
            link: 'http://www.veduca.com.br',
            id: 'veduca'
        }
    }
}

module.exports = new VeducaConsumer();
