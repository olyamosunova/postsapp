import React, {useState, useEffect} from "react";
import {PostItemProps} from "./PostItem.props";
import styles from "./PostItem.module.css";
import cn from "classnames";
import {Card, Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import { TrashFill, PencilFill, SaveFill } from 'react-bootstrap-icons';
import {useDispatch, useSelector} from "react-redux";
import {Operations as DataOperations} from "../../store/data/data";
import {extend} from "../../utils";
import {getFormSendingFlag} from "../../store/data/selectors";

const PostItem = ({post, className, ...props}: PostItemProps) => {
    const [postInfo, setPostInfo] = useState(post);
    const [isEditMode, setEditMode] = useState(false);
    const dispatch = useDispatch();
    const isFormSending = useSelector(getFormSendingFlag);

    const handlerDeletePost = () => {
        dispatch(DataOperations.deletePost(post.id));
    };

    const handlerOpenEditForm = () => setEditMode(true);

    const handlerEditPost = async () => {
        await dispatch(DataOperations.editPost(postInfo));
        setEditMode(false);
    };

    const handlerChangeTitle = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setPostInfo(extend(postInfo, {
            title: evt.target.value
        }))
    };

    const handlerChangeText = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostInfo(extend(postInfo, {
            body: evt.target.value
        }))
    };

    return (
        <div className={styles.post}>
                <Card className={styles.postCard}>
                    <Card.Body>
                        {isEditMode ?
                            <Form>
                                <Form.Group controlId="postTitle">
                                    <Form.Control
                                        type="text"
                                        placeholder="Title"
                                        value={postInfo.title}
                                        onChange={handlerChangeTitle}
                                    />
                                </Form.Group>

                                <Form.Group controlId="postText">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Text"
                                        value={postInfo.body}
                                        onChange={handlerChangeText}
                                    />
                                </Form.Group>
                            </Form>
                            :
                            <Link className={styles.postLink} to={`/posts/${post.id}`}>
                                <Card.Title className={styles.postTitle}>{post.title}</Card.Title>
                                <Card.Text>
                                    {post.body}
                                </Card.Text>
                            </Link>
                        }
                    </Card.Body>
                    <Card.Footer>
                        <div className="d-flex justify-content-end">
                            {
                                isEditMode ?
                                    <Button
                                        size="sm"
                                        className="mr-2"
                                        variant="outline-primary"
                                        onClick={handlerEditPost}
                                        disabled={isFormSending}
                                    >
                                        <SaveFill />
                                    </Button>
                                    :
                                    <Button
                                        size="sm"
                                        className="mr-2"
                                        variant="outline-primary"
                                        onClick={handlerOpenEditForm}
                                    >
                                        <PencilFill />
                                    </Button>
                            }

                            <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={handlerDeletePost}
                            >
                                <TrashFill />
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
        </div>
    );
};

export default PostItem;
