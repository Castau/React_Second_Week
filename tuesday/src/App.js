import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, NavLink, useRouteMatch, useParams, Link } from "react-router-dom";

function App(props) {

    return (
        <div className="App">
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/products">
                        <Products bookFactory={props.bookFactory} />
                    </Route>
                    <Route path="/company">
                        <Company />
                    </Route>
                    {/* <Route path="/add-book">
                        <AddBook />
                    </Route> */}
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
        </ul>

    );
}

const Home = () => <div>Home</div>

const Products = ({ bookFactory }) => {
    let match = useRouteMatch();
    return (
        <div>
            <p>Products</p>
            <p>Antal bøger: {bookFactory.getBooks().length}</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {bookFactory.getBooks().map(book => (
                        <tr key={book.id}>
                            <td><Link to={`${match.url}/id/${book.id}`}>Book</Link></td>
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

    return (
        <div>
            <p>BookInfo</p>
            <p>{book.info}</p>
        </div>

    );
}

const Company = () => <div>Company</div>

const NoMatch = () => <div>ERROR!!!!!</div>


export default App;
