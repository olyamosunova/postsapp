import React from "react";
import {useSelector } from "react-redux";
import {getPosts} from "./store/data/selectors";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import PostList from "./components/PostList/PostList";
import PostDetail from "./components/PostDetails/PostDetail";

const App: React.FC = (): JSX.Element => {
    const posts = useSelector (getPosts);

    console.log(posts);

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/posts" />
                </Route>
                <Route exact path="/posts">
                    <PostList />
                </Route>
                <Route exact path="/posts/:id">
                    <PostDetail />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
