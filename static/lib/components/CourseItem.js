class CourseItem extends Component {

    render() {
        return (
            <a href={ course.link } target="_blank">
                <div className="col-md-3 col-sm-6 hero-feature">
                    <div className="thumbnail">
                        <div className="image-container" style={{backgroundImage: `url(${course.image})`}}></div>
                        <div className="caption text-left">
                            <p>{ course.name }</p>
                        </div>
                        <div className="provider">
                            <p>By: { course.source }</p>
                        </div>
                    </div>
                </div>
            </a>
        );
    }

}
