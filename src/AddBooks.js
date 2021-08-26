import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap'

export class AddBooks extends Component {

    render() {
        // const { user } = this.props and in defaultvalue={user}

        return (
            <div>
                <Modal show={this.props.popup} onHide={this.props.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Your New Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        < Form onSubmit={this.props.addbook}>
                            <Form.Group className="mb-3"  >
                                <Form.Control type="email" defaultValue={this.props.user.email} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Control type="text" name="title" rows={3} placeholder="Book Name" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Control as="textarea" name="description" rows={3} placeholder="Description" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" name="status" placeholder=" Status" />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={this.props.close} >ADD</Button>
                        </Form >

                    </Modal.Body>

                </Modal>
            </div>
        )
    }
}

export default AddBooks






