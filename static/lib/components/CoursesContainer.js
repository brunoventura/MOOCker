import React, { Component, PropTypes } from 'react';
import 'whatwg-fetch';

class CoursesContainer extends Component {
    constructor() {
        super();
        this.state = {
            courses: []
        }
    }

    componentWillMount() {
        fetch('courses.json')
            .then(response => response.json())
            .then(responseData => this.setState({courses: responseData}))
            .catch(err => console.error(err));
    }

    render() {
        const courseNames = this.state.courses.map(course => {
            return (
                <a href={ course.link } target="_blank">
                    <div className="col-md-3 col-sm-6 hero-feature">
                        <div className="thumbnail">
                            <div className="image-container" style={{backgroundImage: `url(${course.image})`}}></div>
                            <div className="caption text-left">
                                <p>{ course.name }</p>
                            </div>
                            <div className="text-left">
                                <p>{ course.startDate && new Date(course.startDate).toISOString() }</p>
                            </div>
                            <div className="provider">
                                <p>By: { course.source }</p>
                            </div>
                        </div>
                    </div>
                </a>
            );
        })
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h3>Todos Cursos</h3>
                    </div>
                </div>
                <div className="row text-center">
                    { courseNames }
                </div>
            </div>
        );
    }

}

export default CoursesContainer;
