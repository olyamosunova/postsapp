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
import {getComments, getPosts} from "./store/data/selectors";
import {getPost} from "./utils";

interface MatchParams {
    id: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

const App: React.FC = (): JSX.Element => {
    const posts = useSelector(getPosts);

    const renderPostPage = (id: string) => {
        const post = getPost(posts, Number(id));
        return (
            <PostDetail post={post}/>
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
