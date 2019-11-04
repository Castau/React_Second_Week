import React from 'react';
import './App.css';
import { HashRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
import data from './data/data'


export default App;

function App() {
    return (
        <Router>
            <div>
                <ul>
                    <li> <Link to="/">Home</Link> </li>
                    <li> <Link to="/users">See All U3ers</Link> </li>
                </ul>

                <Switch>
                    <Route path="/users"> <Users /> </Route>
                    <Route exact path="/"> <Home /> </Route>
                </Switch>
            </div>
        </Router>
    );
}

function User() {
    let { userIndex } = useParams();
    const user = data['users'][userIndex];
    const userArray = Object.keys(user).map((key, index) => {
        if (key !== 'picture') {
            return <li key={index}>{key}: {user[key]} </li>
        }
    });
    return (
        <div>
            <h3>Requested user Index: {userIndex}</h3>
            <ul>
                {userArray}
            </ul>
            <img src={user.picture.large} />
        </div>
    );
}
function Home() {
    return (
        <div>
            <h3>Home</h3>
            <p>Welcome to our friends site</p>
        </div>
    );
}

function Users() {
    let match = useRouteMatch();
    return (
        <div>
            <h3>All Users</h3>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {data.users.map((user, index) => (
                        <tr key={index}>
                            <td><img src={user.picture.thumbnail} /></td>
                            <td>{user.first.concat(' ', user.last)}</td>
                            <td><Link to={`${match.url}/details/${index}`}>User</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Switch>
                <Route path={`${match.path}/details/:userIndex`}> <User /> </Route>
            </Switch>
        </div>
    );
}
