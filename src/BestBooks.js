import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import BooksCard from './BooksCard';
import { Button } from 'react-bootstrap';
import AddBooks from './AddBooks';
import UpdateBooks from './UpdateBooks';

class MyFavoriteBooks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            booksData: [],
            show: false,
            ID: null,
            selectedBook: {},
            updateModal: false,

        }
    }
    componentDidMount = async () => {
        const { user } = this.props.auth0;
        let BooksResult = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/books?email=${user.email}`)
        console.log(BooksResult.data)
        this.setState({
            booksData: BooksResult.data,
        }, () => console.log(this.state.booksData))

    }

    addBookRequest = async (event) => {
        event.preventDefault();
        const { user } = this.props.auth0;
        const bookInfo = {
            email: user.email,
            title: event.target.title.value,
            description: event.target.description.value,
        }
        console.log(bookInfo);
        let addBook = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/addbook`, bookInfo);
        this.setState({
            booksData: addBook.data,
        }, () => console.log(this.state.booksData));
    }


    showModalHandler = () => {
        console.log('hello')
        this.setState({
            show: true
        });
    }
    closeModalHandler = () => {
        console.log('close')
        this.setState({
            show: false,
            updateModal: false,
        });
    }

    deleteBookRequest = async (bookID) => {
        const { user } = this.props.auth0;
        console.log('delete this book');
        console.log(bookID);
        let deleteBook = await axios.delete(`${process.env.REACT_APP_SERVER_LINK}/deletebook/${bookID}?email=${user.email}`)
        this.setState({
            booksData: deleteBook.data
        })
    }
    updateBookRequest = async (bookID) => {
        // all the data saved in bookData
        let chosenBook = this.state.booksData.find(book => {
            // if (book._id === bookID) return true
            return book._id === bookID;
        })
        console.log({ chosenBook }); // object
        this.setState({
            selectedBook: chosenBook,
            updateModal: true,
        }, () => console.log(this.state.updateModal));
        // let updateBook = await axios.put(`${process.env.REACT_APP_SERVER_LINK}/updatebook/${bookID}?email=${user.email}`)
    }

    updateInfo = async (event) => {
        event.preventDefault();
        console.log('inside update function')
        const { user } = this.props.auth0;
        const bookInfo = {
            email: user.email,
            title: event.target.title.value,
            description: event.target.description.value,
        }
        console.log(bookInfo);
        const bookID = this.state.selectedBook._id
        let updateBook = await axios.put(`${process.env.REACT_APP_SERVER_LINK}/updatebook/${bookID}?email=${user.email}`, bookInfo);
        console.log(updateBook, "updateBook");
        this.setState({
            booksData: updateBook.data,
        }, () => (this.closeModalHandler()));

    }
    render() {
        const { user } = this.props.auth0;
        return (
            <div>
                <Jumbotron>
                    <h1>My Favorite Books</h1>
                    <p>
                        This is a collection of my favorite books
                    </p>
                    <Button variant="outline-primary" onClick={this.showModalHandler}>Add New Book</Button>
                </Jumbotron>
                {this.state.booksData.length > 0 && (this.state.booksData.map((book, i) => <BooksCard book={book} key={i} delete={this.deleteBookRequest} update={this.updateBookRequest} />))}

                <AddBooks user={user} popup={this.state.show} close={this.closeModalHandler} addbook={this.addBookRequest} />

                {this.state.updateModal && <UpdateBooks user={user} updatemodal={this.state.updateModal} close={this.closeModalHandler} selectedBook={this.state.selectedBook} updateInfo={this.updateInfo} />}



            </div>
        )
    }
}

export default withAuth0(MyFavoriteBooks);
{/* <withAuth0>
    .../ class component  
    <MyFavoriteBooks Auth0={Auth0} >
</withAuth0> */}


