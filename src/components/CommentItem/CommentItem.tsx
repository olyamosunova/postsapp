import React, {useState} from "react";
import styles from "./CommentItem.module.css";
import {CommentItemProps} from "./CommentItem.props";
import {Button, Form} from "react-bootstrap";
import {PencilFill, SaveFill, TrashFill} from "react-bootstrap-icons";
import {Operations as DataOperations} from "../../store/data/data";
import {useDispatch, useSelector} from "react-redux";
import {getFormEditSendingFlag} from "../../store/data/selectors";

const CommentItem = ({comment, className, ...props}: CommentItemProps): JSX.Element => {
    const dispatch = useDispatch();
    const isFormSending = useSelector(getFormEditSendingFlag);
    const [isEditMode, setEditMode] = useState(false);
    const [commentBody, setCommentBody] = useState(comment.body);

    const handlerChangeComment = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setCommentBody(evt.target.value);
    };

    const handlerDeleteComment = () => {
        dispatch(DataOperations.deleteComment(comment.id));
    };

    const handlerOpenEditComment = () => setEditMode(true);

    const handlerEditComment = () => {
        const newComment = comment;
        newComment.body = commentBody;

        dispatch(DataOperations.editComment(newComment));
        setEditMode(false);
    };

    return (
        <li className={styles.commentItem} key={comment.id}>
            <div className={styles.commentHeader}>
                <a href={`mailto:${comment.email}`} className={styles.commentAuthor}>{comment.name}</a>
            </div>
            <div className={styles.commentBody}>
                {isEditMode ?
                    <Form>
                        <Form.Control className={styles.commentTextarea} as="textarea" value={commentBody} onChange={handlerChangeComment} />
                    </Form>
                : comment.body}
            </div>
            <div className={styles.commentFooter}>
                <div className="d-flex justify-content-end">
                    {
                        isEditMode ?
                            <Button
                                size="sm"
                                className="mr-2"
                                variant="outline-primary"
                                onClick={handlerEditComment}
                                disabled={isFormSending}
                            >
                                <SaveFill />

                            </Button>
                            :
                            <Button
                                size="sm"
                                className="mr-2"
                                variant="outline-primary"
                                onClick={handlerOpenEditComment}
                            >
                                <PencilFill />
                            </Button>
                    }

                    {
                        isEditMode ?
                            <Button
                                size="sm"
                                className="mr-2"
                                variant="outline-primary"
                                onClick={() => setEditMode(false)}
                            >
                                Cancel

                            </Button>
                            :
                            <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={handlerDeleteComment}
                            >
                                <TrashFill />
                            </Button>
                    }
                </div>
            </div>
        </li>
    );
};

export default CommentItem;
