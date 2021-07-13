import React from "react";
import {PostItemProps} from "./PostItem.props";
import styles from "./PostItem.module.css";
import cn from "classnames";
import {Card, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import { TrashFill, PencilFill } from 'react-bootstrap-icons';
import {useDispatch} from "react-redux";
import {Operations as DataOperations} from "../../store/data/data";

const PostItem = ({post, className, ...props}: PostItemProps) => {
    const dispatch = useDispatch();

    const handlerDeletePost = () => {
        dispatch(DataOperations.deletePost(post.id));
    };

    return (
        <div className={styles.post}>
                <Card>
                    <Card.Body>
                        <Link className={styles.postLink} to={`/posts/${post.id}`}>
                            <Card.Title className={styles.postTitle}>{post.title}</Card.Title>
                            <Card.Text>
                                {post.body}
                            </Card.Text>
                        </Link>
                    </Card.Body>
                    <Card.Footer>
                        <div className="d-flex justify-content-end">
                            <Button size="sm" className="mr-2" variant="outline-primary">
                                <PencilFill />
                            </Button>
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
