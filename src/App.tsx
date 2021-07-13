import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    RouteComponentProps
} from "react-router-dom";
import PostList from "./components/PostList/PostList";
import PostDetail from "./components/PostDetails/PostDetail";
import {useSelector} from "react-redux";
import {getPosts} from "./store/data/selectors";

interface MatchParams {
    id: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

const App: React.FC = (): JSX.Element => {
    const posts = useSelector(getPosts);

    const renderPostPage = (id: string) => {
        return (
            <PostDetail postId={Number(id)}/>
        );
    };

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/posts" />
                </Route>
                <Route exact path="/posts">
                    <PostList posts={posts} />
                </Route>
                <Route exact path="/posts/:id"  render={({match}: MatchProps) => renderPostPage(match.params.id)} />
            </Switch>
        </Router>
    );
};

export default App;
