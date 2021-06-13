import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import "./App.scss";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Header />
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
