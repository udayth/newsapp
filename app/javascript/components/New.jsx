import React from "react";
import { Link } from "react-router-dom";

class New extends React.Component {
    constructor(props) {
        super(props);
        this.state = { news: { description: "" } };

        this.addHtmlEntities = this.addHtmlEntities.bind(this);
    }

    componentDidMount() {
        const {
            match: {
                params: { id }
            }
        } = this.props;

        const url = `/api/v1/show/${id}`;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Response was not ok.");
            })
            .then(response => this.setState({ news: response }))
            .catch(() => this.props.history.push("/news"));
    }
    addHtmlEntities(str) {
        return String(str)
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
    }

    render() {
        const { news } = this.state;
        let descriptionList = "No description available";


        const newsDescription = this.addHtmlEntities(news.description);

        return (
            <div className="">
                <div className="hero position-relative d-flex align-items-center justify-content-center">
                    <div className="overlay bg-dark position-absolute" />
                    <h1 className="display-4 position-relative text-white">
                        {news.title}
                    </h1>
                </div>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-sm-12 col-lg-7">
                            <h5 className="mb-2">Description</h5>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: `${newsDescription}`
                                }}
                            />
                        </div>
                        <div className="col-sm-12 col-lg-2">
                            <button type="button" className="btn btn-danger">
                                Delete News
                  </button>
                        </div>
                    </div>
                    <Link to="/news" className="btn btn-link">
                        Back to News
              </Link>
                </div>
            </div>
        );
    }
}

export default New;