import React from "react";
import { Link } from "react-router-dom";

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: []
        };
    }
    componentDidMount() {
        const url = "/api/v1/news/index";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Response was not ok.");
            })
            .then(response => this.setState({ news: response }))
            .catch(() => this.props.history.push("/"));
    }

    render() {
        const { news } = this.state;
        const allNews = news.map((news, index) => (
            <div key={index} className="col-md-6 col-lg-4">
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">{news.title}</h5>
                        <Link to={`/new/${news.id}`} className="btn custom-button">
                            View News
                </Link>
                    </div>
                </div>
            </div>
        ));
        const noNews = (
            <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
                <h4>
                    No news yet. Do you want to <Link to="/new_news">create one</Link>
                </h4>
            </div>
        );

        return (
            <>
                <section className="jumbotron jumbotron-fluid text-center">
                    <div className="container py-5">
                        <h1 className="display-4">Today's News</h1>
                        <p className="lead text-muted">
                            Here is the latest News. Go ahead and read.
                </p>
                    </div>
                </section>
                <div className="py-5">
                    <main className="container">
                        <div className="text-right mb-3">
                            <Link to="/newnews" className="btn custom-button">
                                Add New News
                  </Link>
                        </div>
                        <div className="row">
                            {news.length > 0 ? allNews : noNews}
                        </div>
                        <Link to="/" className="btn btn-link">
                            Home
                </Link>
                    </main>
                </div>
            </>
        );
    }
}
export default News;