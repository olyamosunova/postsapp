import React from "react";
import {PostDetailsProps} from "./PostDetails.props";
import styles from "./PostDetails.module.css";
import cn from "classnames";
import {Card, Button} from "react-bootstrap";


const PostDetail = ({postId, className, ...props}: PostDetailsProps) => {
    return (
        <div className={styles.post}>
            <Card>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default PostDetail;
