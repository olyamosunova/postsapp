import {extend} from "../../utils";
import {PostInterface} from "../../interfaces";
import {Dispatch} from "redux";

interface InitialDataStateInterface {
    posts?: Array<PostInterface> | [];
    isPostsLoaded?: boolean;
}

interface DataActionInterface {
    type?: string | void;
    payload?: PostInterface[] | boolean;
}

const initialState: InitialDataStateInterface = {
    posts: [],
    isPostsLoaded: false
};

const ActionType = {
    LOAD_POSTS: `LOAD_POSTS`,
    CHANGE_FLAG_POST_LOADED: `CHANGE_FLAG_POST_LOADED`,
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
};

const Operations = {
    loadPosts: () => (dispatch: Dispatch) => {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                try {
                    const data = JSON.parse(xmlhttp.responseText);
                    dispatch(ActionCreator.loadPosts(data));
                    dispatch(ActionCreator.changeIsLoadedFlag(false));
                } catch(err) {
                    dispatch(ActionCreator.changeIsLoadedFlag(false));
                }
            }
        };

        xmlhttp.open("GET", 'https://jsonplaceholder.typicode.com/posts', true);
        xmlhttp.send();
    }
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
    }
    return state;
};

export {reducer, ActionType, ActionCreator, Operations, initialState};
