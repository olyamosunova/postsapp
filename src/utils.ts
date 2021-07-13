import {PostInterface} from "./interfaces";

// @ts-ignore
export const extend = (a, b) => {
    return Object.assign({}, a, b);
};


export const getPost = (posts: Array<PostInterface>, postId: number) => {
    const post = posts.find(({id}) => id === postId);
    console.log(posts);
    return post;
};
