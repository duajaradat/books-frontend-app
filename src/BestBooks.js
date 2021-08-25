import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import BooksCard from './BooksCard';
import { Button } from 'react-bootstrap';
import AddBooks from './AddBooks';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      booksData: [],
      show: false,

    }
  }
  componentDidMount = async () => {
    const { user } = this.props.auth0;
    let BooksResult = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/books?email=${user.email}`)
    console.log(BooksResult.data)
    this.setState({
      booksData: BooksResult.data,

    })

  }

  addBookRequest = async (event) => {
    event.preventDefault();
    const { user } = this.props.auth0;
    const bookInfo = {
      email: user.email,
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value

    }
    console.log(bookInfo);
    let addBook = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/addbook`, bookInfo);
    this.setState({
      booksData: addBook.data,
    }, (booksData) => { console.log({ booksData }) });
  }


  showModalHandler = () => {
    console.log('hello')
    this.setState({
      show: true
    });
  }
  closeModalHandler = () => {
    console.log('close')
    this.setState({ show: 0 });
  }

  render() {
    console.log(this.state.show);

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
        {this.state.booksData.length > 0 && (this.state.booksData.map((book, i) => <BooksCard book={book} key={i} />))}

        <AddBooks user={user} popup={this.state.show} close={this.closeModalHandler} addbook={this.addBookRequest} />
      </div>
    )
  }
}

{/* <withAuth0>
    .../ class component  
    <MyFavoriteBooks Auth0={Auth0} >
</withAuth0> */}

export default withAuth0(MyFavoriteBooks);

