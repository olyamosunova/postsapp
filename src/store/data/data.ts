import {extend} from "../../utils";
import {PostInterface} from "../../interfaces";
import {Dispatch} from "redux";
import axios from "axios";

interface InitialDataStateInterface {
    posts?: Array<PostInterface> | [];
    isPostsLoaded?: boolean;
    isFormSending: boolean;
}

interface DataActionInterface {
    type?: string | void;
    payload?: PostInterface[] | boolean | PostInterface;
}

const initialState: InitialDataStateInterface = {
    posts: [],
    isPostsLoaded: false,
    isFormSending: false
};

const ActionType = {
    LOAD_POSTS: `LOAD_POSTS`,
    CHANGE_FLAG_POST_LOADED: `CHANGE_FLAG_POST_LOADED`,
    ADD_POST: `ADD_POST`,
    CHANGE_FLAG_FORM_SENDING: `CHANGE_FLAG_FORM_SENDING`
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
};

const reducer = (state = initialState, action: DataActionInterface) => {
    switch (action.type) {
        case ActionType.LOAD_POSTS:
            return extend(state, {
                posts: action.payload,
            });

        case ActionType.CHANGE_FLAG_POST_LOADED:
            return extend(state, {
                isPostsLoaded: action.payload,
            });

        case ActionType.ADD_POST:
            const newPost = action.payload;
            let allPosts = state.posts;

            allPosts?.unshift(newPost);

            return extend(state, {
                posts: allPosts
            });

        case ActionType.CHANGE_FLAG_FORM_SENDING:
            return extend(state, {
                isFormSending: action.payload,
            });
    }
    return state;
};

export {reducer, ActionType, ActionCreator, Operations, initialState};
