import {PostInterface} from "./interfaces";

export const extend = (a: {}, b: {}) => {
    return Object.assign({}, a, b);
};
