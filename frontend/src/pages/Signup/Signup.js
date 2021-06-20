import "./Signup.scss";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Button from "../../components/Button";
import axios from "axios";

function Signup() {
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post(process.env.REACT_APP_BACKEND_URL + "/auth/signup", {
                name: event.target.name.value,
                email: event.target.email.value,
                password: event.target.password.value,
            })
            .then(() => {
                setShouldRedirect(true);
            });
    };

    if (shouldRedirect) return <Redirect to="/login" />;

    return (
        <main className="page-signup">
            <div>
                <h1>Sign up</h1>
                <form onSubmit={handleSubmit}>
                    <label className="page-signup__label">
                        Name
                        <input type="text" name="name" className="page-signup__input" />
                    </label>
                    <label className="page-signup__label">
                        Email
                        <input type="text" name="email" className="page-signup__input" />
                    </label>
                    <label className="page-signup__label">
                        Password
                        <input type="password" name="password" className="page-signup__input" />
                    </label>
                    <Button>Sign up</Button>
                </form>
                <p className="page-signup__footer">
                    Have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </main>
    );
}

export default Signup;
