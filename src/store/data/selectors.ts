import NameSpace from "../name-space";
import {CommentInterface, PostInterface} from "../../interfaces";

export const getPosts = (state: { [x: string]: { posts: Array<PostInterface>; }; }) => state[NameSpace.DATA].posts;
export const getLoadedFlag = (state: { [x: string]: { isLoaded: boolean; }; }) => state[NameSpace.DATA].isLoaded;
export const getFormSendingFlag = (state: { [x: string]: { isFormSending: boolean; }; }) => state[NameSpace.DATA].isFormSending;
export const getFormEditSendingFlag = (state: { [x: string]: { isFormEditSending: boolean; }; }) => state[NameSpace.DATA].isFormEditSending;
export const getComments = (state: { [x: string]: { currentComments: Array<CommentInterface>; }; }) => state[NameSpace.DATA].currentComments;
