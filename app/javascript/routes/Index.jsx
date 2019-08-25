import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import News from "../components/News";
import New from "../components/New";
import NewNews from "../components/NewNews";

export default (
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/news" exact component={News} />
            <Route path="/new/:id" exact component={New} />
            <Route path="/newnews" exact component={NewNews} />
        </Switch>
    </Router>
);