import React from "react";
import {Spinner} from "react-bootstrap";
import styles from "./Loader.module.css";
import {LoaderProps} from "./Loader.props";

const Loader: React.FC = ({className, ...props}: LoaderProps): JSX.Element => {
    return (
        <div className={styles.loader}>
            <Spinner animation="grow" />
        </div>
    );
};

export default Loader;
