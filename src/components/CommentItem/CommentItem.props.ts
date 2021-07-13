import {DetailedHTMLProps, HTMLAttributes} from "react";
import {CommentInterface} from "../../interfaces";

export interface CommentItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
    comment: CommentInterface
}
