import React, {FormEvent, useEffect, useState} from "react";
import {PostDetailsProps} from "./PostDetails.props";
import styles from "./PostDetails.module.css";
import cn from "classnames";
import {Button, Container, Form, FormControl, InputGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Operations as DataOperations, ActionCreator} from "../../store/data/data";
import {getComments, getFormSendingFlag} from "../../store/data/selectors";
import CommentList from "../CommentList/CommentList";


const PostDetail = ({post, className, ...props}: PostDetailsProps) => {
    const dispatch = useDispatch();
    const comments = useSelector(getComments) ?? [];
    const [message, setMessage] = useState('');
    const [isPageOpen, setPageOpen] = useState(false);
    const isFormSending = useSelector(getFormSendingFlag);

    useEffect(() => {
        dispatch(ActionCreator.clearComments());
        setPageOpen(false);
    }, []);

    useEffect(() => {
        if (post?.id && !isPageOpen) {
            dispatch(DataOperations.loadComments(post.id));
            setPageOpen(true);
        }
    });

    const resetForm = () => {
        setMessage('');
    };

    const handlerSubmitComment = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const commentInfo = {
            postId: post.id,
            name: 'Olya Mosunova',
            email: 'test@mail.ru',
            body: message
        };

        await dispatch(DataOperations.sendComment(commentInfo));
        resetForm();
    };

    const handlerChangeComment = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(evt.target.value);
    };

    return (
        <Container className="py-4">
            <article className={styles.post}>
                <div>
                    <h2 className="mb-3">{post.title}</h2>

                    <p>{post.body}</p>
                </div>
                <div>
                    <Form onSubmit={handlerSubmitComment}>
                        <InputGroup className="mb-3">
                            <FormControl
                                as="textarea"
                                placeholder="Your comment"
                                value={message}
                                onChange={handlerChangeComment}
                                required
                            />
                            <Button variant="primary" type="submit" disabled={isFormSending}>
                                {isFormSending ? `Sending...` : `Add comment` }
                            </Button>
                        </InputGroup>
                    </Form>

                    <h6>Comments ({comments.length})</h6>

                    <CommentList comments={comments} />
                </div>
            </article>
        </Container>
    );
};

export default PostDetail;
