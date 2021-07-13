import React, {FormEvent, useState} from "react";
import styles from "./ModalAddPost.module.css";
import {ModalAddPostProps} from "./ModalAddPost.props";
import {Form, Modal} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {extend} from "../../utils";
import {useSelector, useDispatch} from "react-redux";
import {Operations as DataOperations} from "../../store/data/data";
import {getFormSendingFlag} from "../../store/data/selectors";

const ModalAddPost = ({setShow, className, ...props}: ModalAddPostProps): JSX.Element => {
    const [formState, setFormState] = useState({
        title: '',
        body: '',
        userId: 1,
        id: 1,
    });

    const dispatch = useDispatch();

    const isFormSending = useSelector(getFormSendingFlag);

    const handlerChangeTitle = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setFormState(extend(formState, {
            title: evt.target.value
        }))
    };

    const handlerChangeText = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormState(extend(formState, {
            body: evt.target.value
        }))
    };

    const handleClose = () => setShow(false);

    const handlerSubmitForm = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        await dispatch(DataOperations.sendPost(formState));
        handleClose();
    };

    return (
        <>
            <Modal size="lg" show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handlerSubmitForm}>
                        <Form.Group controlId="postTitle">
                            <Form.Label>Post title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                value={formState.title}
                                onChange={handlerChangeTitle}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="postText">
                            <Form.Label>Post Text</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Text"
                                value={formState.body}
                                onChange={handlerChangeText}
                                required
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Button type="button" className="mr-2" variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button type="submit" variant="primary" disabled={isFormSending}>
                                {isFormSending ? 'Sending...' : 'Save post'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalAddPost;
