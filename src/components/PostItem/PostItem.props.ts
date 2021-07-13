import {DetailedHTMLProps, HTMLAttributes} from "react";
import {PostInterface} from "../../interfaces";

export interface PostItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    post: PostInterface
}
