import {DetailedHTMLProps, HTMLAttributes} from "react";
import {CommentInterface} from "../../interfaces";

export interface CommentListProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
    comments: Array<CommentInterface>
}
