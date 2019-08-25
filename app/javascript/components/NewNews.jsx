import React from "react";
import { Link } from "react-router-dom";


class NewNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            author: "",
            tags: "",
            created_at: "",
            updated_at: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
    }

    stripHtmlEntities(str) {
        return String(str)
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        const url = "/api/v1/news/create";
        const { title, description, author, tags, created_at, updated_at } = this.state;

        if (title.length == 0 || description.length == 0 || author.length == 0 || tags.length == 0 || created_at.length == 0 || updated_at.length == 0)
            return;

        const body = {
            title,
            description: description.replace(/\n/g, "<br> <br>"),
            author,
            tags,
            created_at,
            updated_at
        };

        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Response was not ok.");
            })
            .then(response => this.props.history.push(`/news/${response.id}`))
            .catch(error => console.log(error.message));
    }

    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 offset-lg-3">
                        <h1 className="font-weight-normal mb-5">
                            Add new News items to the DB.
                </h1>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="newsTitle">News Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="newsTitle"
                                    className="form-control"
                                    required
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newsDescription">News Details</label>
                                <textarea
                                    name="description"
                                    id="newsDescription"
                                    className="form-control"
                                    rows="5"
                                    required
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="author">Author</label>
                                <input
                                    type="text"
                                    name="author"
                                    id="author"
                                    className="form-control"
                                    required
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tags">News Tags</label>
                                <input
                                    type="text"
                                    name="tags"
                                    id="tags"
                                    className="form-control"
                                    required
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="created_at">Created At Date</label>
                                <input
                                    type="text"
                                    name="created_at"
                                    id="created_at"
                                    className="form-control"
                                    required
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="updated_at">Updated At Date</label>
                                <input
                                    type="text"
                                    name="updated_at"
                                    id="updated_at"
                                    className="form-control"
                                    required
                                    onChange={this.onChange}
                                />
                            </div>
                            <button type="submit" className="btn custom-button mt-3">
                                Create New News
                  </button>
                            <Link to="/news" className="btn btn-link mt-3">
                                Back to News
                  </Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewNews;