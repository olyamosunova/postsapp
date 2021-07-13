import {PostInterface} from "./interfaces";

// @ts-ignore
export const extend = (a, b) => {
    return Object.assign({}, a, b);
};


export const getPost = (posts: Array<PostInterface>, postId: number) => {
    return posts.find(({id}) => id === postId) ?? {};
};
