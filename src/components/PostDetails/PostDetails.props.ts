import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface PostDetailsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    postId: string | number
}
