import {extend} from "../../utils";
import {PostInterface, CommentInterface} from "../../interfaces";
import {Dispatch} from "redux";
import axios from "axios";

interface InitialDataStateInterface {
    posts?: Array<PostInterface> | [];
    isLoaded?: boolean;
    isFormSending?: boolean;
    isFormEditSending?: boolean;
    currentComments?: null | Array<CommentInterface>;
}

interface DataActionInterface {
    type?: string | void;
    payload?: PostInterface[] | boolean | PostInterface;
}

const initialState: InitialDataStateInterface = {
    posts: [],
    isLoaded: false,
    isFormSending: false,
    currentComments: null,
    isFormEditSending: false
};

const ActionType = {
    LOAD_POSTS: `LOAD_POSTS`,
    CHANGE_FLAG_POST_LOADED: `CHANGE_FLAG_POST_LOADED`,
    ADD_POST: `ADD_POST`,
    CHANGE_FLAG_FORM_SENDING: `CHANGE_FLAG_FORM_SENDING`,
    DELETE_POST: `DELETE_POST`,
    EDIT_POST: `EDIT_POST`,
    LOAD_COMMENTS: `LOAD_COMMENTS`,
    CLEAR_COMMENTS: `CLEAR_COMMENTS`,
    ADD_COMMENT: `ADD_COMMENT`,
    DELETE_COMMENT: `DELETE_COMMENT`,
    EDIT_COMMENT: `EDIT_COMMENT`,
    CHANGE_FLAG_FORM_EDIT_SENDING: `CHANGE_FLAG_FORM_EDIT_SENDING`,
};

const ActionCreator = {
    loadPosts: (posts: Array<PostInterface>) => {
        return {
            type: ActionType.LOAD_POSTS,
            payload: posts,
        };
    },
    changeIsLoadedFlag: (flag: boolean) => {
        return {
            type: ActionType.CHANGE_FLAG_POST_LOADED,
            payload: flag,
        };
    },
    addPost: (post: PostInterface) => {
        return {
            type: ActionType.ADD_POST,
            payload: post,
        };
    },
    changeIsFormSendingFlag: (flag: boolean) => {
        return {
            type: ActionType.CHANGE_FLAG_FORM_SENDING,
            payload: flag,
        };
    },
    changeIsFormEditSendingFlag: (flag: boolean) => {
        return {
            type: ActionType.CHANGE_FLAG_FORM_EDIT_SENDING,
            payload: flag,
        };
    },
    deletePost: (postId: number) => {
        return {
            type: ActionType.DELETE_POST,
            payload: postId,
        };
    },
    editPost: (post: PostInterface) => {
        return {
            type: ActionType.EDIT_POST,
            payload: post,
        };
    },
    loadComments: (comments: Array<CommentInterface>) => {
        return {
            type: ActionType.LOAD_COMMENTS,
            payload: comments,
        };
    },
    clearComments: () => {
        return {
            type: ActionType.CLEAR_COMMENTS,
            payload: null,
        };
    },
    addComment: (comment: CommentInterface) => {
        return {
            type: ActionType.ADD_COMMENT,
            payload: comment,
        };
    },
    deleteComment: (commentId: number) => {
        return {
            type: ActionType.DELETE_COMMENT,
            payload: commentId,
        };
    },
    editComment: (comment: CommentInterface) => {
        return {
            type: ActionType.EDIT_COMMENT,
            payload: comment,
        };
    },
};

const Operations = {
    loadPosts: () => (dispatch: Dispatch) => {
        return axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                const data = response.data;
                dispatch(ActionCreator.loadPosts(data));
                dispatch(ActionCreator.changeIsLoadedFlag(true));
            })
            .catch(err => {
                dispatch(ActionCreator.changeIsLoadedFlag(true));
                throw Error(err);
            });
    },
    sendPost: (post: PostInterface) => (dispatch: Dispatch) => {
        dispatch(ActionCreator.changeIsFormSendingFlag(true));

        return axios.post('https://jsonplaceholder.typicode.com/posts', post)
            .then((response) => {
                const data = response.data;
                dispatch(ActionCreator.addPost(data));
                dispatch(ActionCreator.changeIsFormSendingFlag(false));
            })
            .catch(err => {
                throw Error(err);
            });
    },
    deletePost: (postId: number) => (dispatch: Dispatch) => {
        dispatch(ActionCreator.changeIsLoadedFlag(false));

        return axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(() => {
                dispatch(ActionCreator.deletePost(postId));
                dispatch(ActionCreator.changeIsLoadedFlag(true));
            })
            .catch(err => {
                throw Error(err);
            });
    },
    editPost: (post: PostInterface) => (dispatch: Dispatch) => {
        dispatch(ActionCreator.changeIsFormSendingFlag(true));

        return axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post)
            .then((response) => {
                const data = response.data;
                dispatch(ActionCreator.editPost(data));
                dispatch(ActionCreator.changeIsFormSendingFlag(false));
            })
            .catch(err => {
                throw Error(err);
            });
    },
    loadComments: (postId: number) => (dispatch: Dispatch) => {
        dispatch(ActionCreator.changeIsLoadedFlag(false));

        return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then((response) => {
                const data = response.data;
                dispatch(ActionCreator.loadComments(data));
                dispatch(ActionCreator.changeIsLoadedFlag(true));
            })
            .catch(err => {
                dispatch(ActionCreator.changeIsLoadedFlag(true));
                throw Error(err);
            });
    },
    sendComment: (comment: CommentInterface) => (dispatch: Dispatch) => {
        dispatch(ActionCreator.changeIsFormSendingFlag(true));

        return axios.post(`https://jsonplaceholder.typicode.com/posts/${comment.postId}/comments`, comment)
            .then((response) => {
                const data = response.data;
                dispatch(ActionCreator.addComment(data));
                dispatch(ActionCreator.changeIsFormSendingFlag(false));
            })
            .catch(err => {
                throw Error(err);
            });
    },
    deleteComment: (commentId: number) => (dispatch: Dispatch) => {
        dispatch(ActionCreator.changeIsLoadedFlag(false));

        return axios.delete(`https://jsonplaceholder.typicode.com/comments/${commentId}`)
            .then(() => {
                dispatch(ActionCreator.deleteComment(commentId));
                dispatch(ActionCreator.changeIsLoadedFlag(true));
            })
            .catch(err => {
                throw Error(err);
            });
    },
    editComment: (comment: CommentInterface) => (dispatch: Dispatch) => {
        dispatch(ActionCreator.changeIsFormEditSendingFlag(true));

        return axios.put(`https://jsonplaceholder.typicode.com/comments/${comment.id}`, comment)
            .then((response) => {
                const data = response.data;
                dispatch(ActionCreator.editComment(data));
                dispatch(ActionCreator.changeIsFormEditSendingFlag(false));
            })
            .catch(err => {
                throw Error(err);
            });
    },
};

const reducer = (state = initialState, action: DataActionInterface) => {
    switch (action.type) {
        case ActionType.LOAD_POSTS:
            return extend(state, {
                posts: action.payload,
            });

        case ActionType.CHANGE_FLAG_POST_LOADED:
            return extend(state, {
                isLoaded: action.payload,
            });

        case ActionType.ADD_POST:
            const newPost = action.payload;
            let allPosts = state.posts?.slice();

            // @ts-ignore
            allPosts?.unshift(newPost);

            return extend(state, {
                posts: allPosts
            });

        case ActionType.CHANGE_FLAG_FORM_SENDING:
            return extend(state, {
                isFormSending: action.payload,
            });

        case ActionType.DELETE_POST:
            const postId = action.payload ?? 0;
            let posts = state.posts;

            const index = posts?.findIndex(item => item.id === postId);

            if (index !== -1) {
                // @ts-ignore
                posts?.splice(index, 1);
            }

            return extend(state, {
                posts,
            });

        case ActionType.EDIT_POST:
            const post = action.payload;
            let postsList = state.posts?.slice();

            // @ts-ignore
            const indexPost = postsList?.findIndex(item => item.id === post.id);

            if (indexPost !== -1) {
                // @ts-ignore
                postsList?.splice(indexPost, 1, post);
            }

            return extend(state, {
                posts: postsList,
            });

        case ActionType.LOAD_COMMENTS:
            return extend(state, {
                currentComments: action.payload,
            });

        case ActionType.CLEAR_COMMENTS:
            return extend(state, {
                currentComments: action.payload,
            });

        case ActionType.ADD_COMMENT:
            const newComment = action.payload;
            let commentsList = state.currentComments?.slice();

            // @ts-ignore
            commentsList?.unshift(newComment);

            return extend(state, {
                currentComments: commentsList
            });

        case ActionType.DELETE_COMMENT:
            const commentId = action.payload ?? 0;
            let comments = state.currentComments?.slice();

            const indexComment = comments?.findIndex(item => item.id === commentId);

            if (indexComment !== -1) {
                // @ts-ignore
                comments?.splice(indexComment, 1);
            }

            return extend(state, {
                currentComments: comments,
            });

        case ActionType.EDIT_COMMENT:
            const comment = action.payload;
            let allComments = state.currentComments?.slice();

            // @ts-ignore
            const indexCom = allComments?.findIndex(item => item.id === comment.id);

            if (indexCom !== -1) {
                // @ts-ignore
                allComments?.splice(indexCom, 1, comment);
            }

            return extend(state, {
                comments: allComments,
            });

        case ActionType.CHANGE_FLAG_FORM_EDIT_SENDING:
            return extend(state, {
                isFormEditSending: action.payload,
            });
    }
    return state;
};

export {reducer, ActionType, ActionCreator, Operations, initialState};
