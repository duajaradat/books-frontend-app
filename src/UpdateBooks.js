import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap'

export class UpdateBooks extends Component {

    render() {
        // const { user } = this.props and in defaultvalue={user}

        return (
            <div>
                <Modal show={this.props.updatemodal} onHide={this.props.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Your Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        < Form onSubmit={this.props.updateInfo}>
                            <Form.Group className="mb-3"  >
                                <Form.Control type="email" defaultValue={this.props.user.email} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Control type="text" name="title" rows={3} defaultValue={this.props.selectedBook.title} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Control as="textarea" name="description" rows={3} defaultValue={this.props.selectedBook.description} />
                            </Form.Group>
                            <Button variant="primary" type="submit" >UPDATE</Button>
                        </Form >
                    </Modal.Body>

                </Modal>
            </div>
        )
    }
}

export default UpdateBooks






