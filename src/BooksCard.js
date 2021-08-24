import React, { Component } from 'react'
import { Card, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export class BooksCard extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{this.props.book.title}</Card.Title>
                            <Card.Text>{this.props.book.description}</Card.Text>
                            <Card.Text> {this.props.book.status} </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </div>
        )
    }
}

export default BooksCard
