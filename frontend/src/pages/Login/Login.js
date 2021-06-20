import "./Login.scss";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import axios from "axios";

function Login({ authenticate }) {
    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post(process.env.REACT_APP_BACKEND_URL + "/auth/login", {
                email: event.target.email.value,
                password: event.target.password.value,
            })
            .then((response) => {
                sessionStorage.setItem("token", response.data.token);
                authenticate();
            });
    };

    return (
        <main className="page-login">
            <div>
                <h1>Log in</h1>
                <form onSubmit={handleSubmit}>
                    <label className="page-login__label">
                        Email
                        <input type="text" name="email" className="page-login__input" />
                    </label>
                    <label className="page-login__label">
                        Password
                        <input type="password" name="password" className="page-login__input" />
                    </label>
                    <Button>Log in</Button>
                </form>
                <p className="page-login__footer">
                    Need an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </main>
    );
}

export default Login;
