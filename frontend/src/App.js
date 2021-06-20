import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Loading from "./pages/Loading/Loading";
import Logout from "./pages/Logout/Logout";
import "./App.scss";
import axios from "axios";

function App() {
    const [loginStatus, setLoginStatus] = useState(0);

    const authenticate = () => {
        axios
            .get(process.env.REACT_APP_BACKEND_URL + "/auth/check", {
                headers: {
                    authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then(() => {
                setLoginStatus(1);
            })
            .catch(() => {
                setLoginStatus(2);
            });
    };

    useEffect(authenticate, []);

    const loggedInRoutes = (
        <>
            <Header />
            <Switch>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
                <Route path="/logout">
                    <Logout authenticate={authenticate} />
                </Route>
                <Redirect to="/dashboard" />
            </Switch>
        </>
    );

    const loggedOutRoutes = (
        <Switch>
            <Route path="/login">
                <Login authenticate={authenticate} />
            </Route>
            <Route path="/signup">
                <Signup />
            </Route>
            <Redirect to="/login" />
        </Switch>
    );

    return (
        <div className="app">
            <BrowserRouter>
                {loginStatus === 0 && <Loading />}
                {loginStatus === 1 && loggedInRoutes}
                {loginStatus === 2 && loggedOutRoutes}
            </BrowserRouter>
        </div>
    );
}

export default App;
