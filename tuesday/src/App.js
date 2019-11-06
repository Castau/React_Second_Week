import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, NavLink, useRouteMatch, useParams, Link, Prompt } from "react-router-dom";

function App(props) {
    const bookFactory = props.bookFactory;
    return (
        <div className="App">
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/products">
                        <Products bookFactory={bookFactory} />
                    </Route>
                    <Route path="/company">
                        <Company />
                    </Route>
                    <Route path="/add-book">
                        <AddBook bookFactory={bookFactory} />
                    </Route>
                    <Route path="/find">
                        <FindBook bookFactory={bookFactory} />
                    </Route>
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

const Header = () => {
    return (
        <ul className="header">
            <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
            <li><NavLink activeClassName="active" to="/products">Products</NavLink></li>
            <li><NavLink activeClassName="active" to="/add-book">Add Book</NavLink></li>
            <li><NavLink activeClassName="active" to="/company">Company</NavLink></li>
            <li><NavLink activeClassName="active" to="/find">Find Book</NavLink></li>
        </ul>

    );
}

const Products = ({ bookFactory }) => {
    let match = useRouteMatch();
    return (
        <div>
            <p>Products</p>
            <p>Antal bøger: {bookFactory.getBooks().length}</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Details</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {bookFactory.getBooks().map(book => (
                        <tr key={book.id}>
                            <td><Link to={`${match.url}/id/${book.id}`}>{book.id}</Link></td>
                            <td>{book.title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Switch>
                <Route path={`${match.path}/id/:bookId`}> <Book bookFactory={bookFactory} /> </Route>
            </Switch>

        </div>
    );
}

const Book = ({ bookFactory }) => {
    let { bookId } = useParams();
    const book = bookFactory.findBook(bookId);
    const bookArray = Object.keys(book).map((key, index) => {
        return <li key={index}>{key}: {book[key]} </li>
    });
    return (
        <div>
            <h4>BookInfo</h4>
            <ul>
                {bookArray}
            </ul>
        </div>
    );
}

const Home = () => <div><p>Home</p></div>

const Company = () => <div><p>Company</p></div>

const NoMatch = () => <div><p>ERROR!!!!!1</p></div>

const FindBook = ({ bookFactory }) => {
    const emptyBook = { id: '', info: '', title: '' };
    const [book, setBook] = useState({ ...emptyBook });
    const initialValue = '';
    const [id, setId] = useState(initialValue);

    const bookArray = Object.keys(book).map((key, index) => {
        return <li key={index}>{key}: {book[key]} </li>;
    });

    const handleChange = event => {
        setId(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        setBook(bookFactory.findBook(id));
        setId(initialValue);
    };

    const showBook = () => {
        if (book.id.length < 99) {
            return <p>Type ID of book to find</p>
        } else {
            return (
                <div>
                    <ul> {bookArray}</ul>
                    <button onClick={handleDelete}>Delete Book</button>
                    <AddBook bookFactory={bookFactory} editBook={book} />
                </div>
            )
        }
    }

    const handleDelete = () => {
        bookFactory.deleteBook(book.id);
        setBook({ ...emptyBook });
    }

    return (
        <div>
            <form>
                <input id='id' type='number' placeholder='Book ID' value={id} onChange={handleChange}></input>
                <button onClick={handleSubmit}>Find Book</button>
            </form>
            {showBook()}
        </div>
    );

}


const AddBook = ({ bookFactory, editBook }) => {
    const emptyBook = { id: '', info: '', title: '' };
    const [book, setBook] = useState(editBook ? { ...editBook } : { ...emptyBook });
    let [isBlocking, setIsBlocking] = useState(false);

    const handleChange = event => {
        const target = event.target;
        const value = target.value;
        const id = target.id;
        setBook({ ...book, [id]: value });
        setIsBlocking(event.target.value.length > 0);
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log('book id', book.id);
        if (book.id === '') {
            console.log('in add');
            bookFactory.addBook(book);
        } else {
            console.log('in edit');
            bookFactory.editBook(book);
        }
        setBook({ ...emptyBook });
        setIsBlocking(false);
    }

    return (
        <div>
            <p>Add a book</p>
            <form>
                <Prompt when={isBlocking} message={location => `Are you sure you want to go to ${location.pathname}`} />
                <input id='title' type='text' placeholder='Book Title' value={book.title} onChange={handleChange}></input>
                <input id='info' type='text' placeholder='Book Info' value={book.info} onChange={handleChange}></input>
                <button onClick={handleSubmit}>Add Book</button>
            </form>
        </div>

    );
}

export default App;
