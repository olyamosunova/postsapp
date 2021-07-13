import React, {useState} from "react";
import styles from "./PostList.module.css";
import {PostListProps} from "./PostList.props";
import {Container, Row, Col} from "react-bootstrap";
import PostItem from "../PostItem/PostItem";
import {useSelector} from "react-redux";
import {getPostsLoadedFlag} from "../../store/data/selectors";
import {Button} from "react-bootstrap";
import Loader from "../Loader/Loader";
import ModalAddPost from "../ModalAddPost/ModalAddPost";

const PostList = ({posts, className, ...props}: PostListProps) => {
    const isPostLoaded = useSelector(getPostsLoadedFlag);

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    return (
        <Container className="py-4">
            <header className={styles.header}>
                <h2 className={styles.title}>Post list</h2>

                <Button variant="primary" onClick={handleShow}>Add new post</Button>
            </header>


            <Row>
                {posts.map(post => {
                    return (
                        <Col className="py-3" md={4} key={post.id}>
                            <PostItem post={post} />
                        </Col>
                    );
                    })

                }
            </Row>

            {!isPostLoaded ? <Loader /> : null}

            {show ? <ModalAddPost setShow={setShow} /> : null}
        </Container>
    );
};

export default PostList;
