import React from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
    Link

    // HashRouter instead of BrowserRouter if deploy on surge
} from "react-router-dom";

export default function App() {
    return (
        <Router>
            <Header />
            <Content />
        </Router>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

function Header() {
    return (
        <nav>
            <ul>
                <li> <Link to="/">Home</Link> </li>
                <li> <Link to="/about">About</Link> </li>
                <li> <Link to="/users">Users</Link> </li>
            </ul>
        </nav>
    );
}

function Content() {
    return (
        <div>
            <Route exact path="/"> <Home /> </Route>
            <Route path="/about"> <About /> </Route>
            <Route path="/users"> <Users /> </Route>
        </div>

        // <Switch>
        //     <Route path="/about"> <About /> </Route>
        //     <Route path="/users"> <Users /> </Route>
        //     <Route path="/home"> <Home /> </Route>
        // </Switch>
    );
}