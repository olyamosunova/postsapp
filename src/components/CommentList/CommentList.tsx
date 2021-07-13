import React from "react";
import styles from "./CommentList.module.css";
import {CommentListProps} from "./CommentList.props";
import CommentItem from "../CommentItem/CommentItem";
import {useSelector} from "react-redux";
import {getLoadedFlag} from "../../store/data/selectors";
import Loader from "../Loader/Loader";

const CommentList = ({comments, className, ...props}: CommentListProps) => {
    const isPostLoaded = useSelector(getLoadedFlag);

    return (
        <>
            {comments.length ?
                <ul className={styles.commentList}>
                    {comments.map(comment => <CommentItem key={comment.id} comment={comment} />)}
                </ul>
                :
                <p>No comments</p>
            }


            {!isPostLoaded ? <Loader /> : null}
        </>
    );
};

export default CommentList;
