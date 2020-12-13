import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
