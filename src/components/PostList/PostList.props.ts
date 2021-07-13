import {DetailedHTMLProps, HTMLAttributes} from "react";
import {PostInterface} from "../../interfaces";

export interface PostListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    posts: Array<PostInterface>
}
