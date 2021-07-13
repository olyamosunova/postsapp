import NameSpace from "../name-space";
import {PostInterface} from "../../interfaces";

export const getPosts = (state: { [x: string]: { posts: Array<PostInterface>; }; }) => state[NameSpace.DATA].posts;
export const getPostsLoadedFlag = (state: { [x: string]: { isPostsLoaded: boolean; }; }) => state[NameSpace.DATA].isPostsLoaded;
