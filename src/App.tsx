import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    RouteComponentProps
} from "react-router-dom";
import {createBrowserHistory} from "history";
import PostList from "./components/PostList/PostList";
import PostDetail from "./components/PostDetails/PostDetail";
import NotFound from "./components/NotFound/NotFound";
import {useSelector} from "react-redux";
import {getPosts} from "./store/data/selectors";
import {getPost} from "./utils";

const history = createBrowserHistory();

interface MatchParams {
    id: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

const App = (): JSX.Element => {
    const posts = useSelector(getPosts);

    const renderPostPage = (id: string) => {
        const post = getPost(posts, Number(id));
        return (
            <PostDetail post={post}/>
        );
    };

    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/posts" />
                </Route>
                <Route exact path="/posts">
                    <PostList posts={posts} />
                </Route>
                <Route
                    exact
                    path="/posts/:id"
                    render={({match}: MatchProps) => renderPostPage(match.params.id)} />
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
