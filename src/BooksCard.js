import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export class BooksCard extends Component {
    deleteBook = () => {
        this.props.delete(this.props.book._id)
    };
    render() {
        return (
            <div>

                <Card style={{ width: '18rem' }} border="secondary">
                    <Card.Body>
                        <Card.Title>{this.props.book.title}</Card.Title>
                        <Card.Text>{this.props.book.description}</Card.Text>
                    </Card.Body>
                    <Button variant="secondary" onClick={this.deleteBook}>Delete Book</Button>
                </Card>

            </div>
        )
    }
}

export default BooksCard
