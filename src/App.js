import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import "./App.scss";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Navigation />
                <Switch>
                    <Route path="/" exact>
                        <Dashboard />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
