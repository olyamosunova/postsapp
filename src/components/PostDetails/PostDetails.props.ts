import {DetailedHTMLProps, HTMLAttributes} from "react";
import {PostInterface} from "../../interfaces";

export interface PostDetailsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    post: PostInterface;
}
