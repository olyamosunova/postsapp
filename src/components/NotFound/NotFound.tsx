import React from "react";
import styles from "./NotFound.module.css";
import {Container} from "react-bootstrap";

const NotFound = (): JSX.Element => {
    return (
        <Container>
            <div className={styles.page}>
                <p>Not found page</p>
            </div>
        </Container>
    );
};

export default NotFound;
