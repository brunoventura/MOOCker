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
                <div className="col-md-3 col-sm-6 hero-feature">
                    <div className="thumbnail">
                        <div className="image-container" style={{backgroundImage: `url(${course.image})`}}></div>
                        <div className="caption">
                            <h3>{ course.name }</h3>
                        </div>
                    </div>
                </div>
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
