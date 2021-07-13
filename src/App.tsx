import React from "react";
import {useSelector } from "react-redux";
import {getPosts} from "./store/data/selectors";

const App: React.FC = (props) => {
    const posts = useSelector (getPosts);

    console.log(posts);

    return <div>Webpack is cool!</div>;
};

export default App;
