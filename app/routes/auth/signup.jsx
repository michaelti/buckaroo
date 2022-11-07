import { Link, useSearchParams, useActionData, json, Form, redirect } from "remix";
import { register, doesUserExist } from "~/utils/session.server";
import Logo from "../../components/Logo";

function validateName(name) {
    if (typeof name !== "string" || name.length < 1) {
        return `Please enter your name`;
    }
}

function validateUsername(username) {
    if (typeof username !== "string" || username.length < 3) {
        return `Usernames must be at least 3 characters`;
    }
}

function validatePassword(password) {
    if (typeof password !== "string" || password.length < 6) {
        return `Passwords must be at least 6 characters`;
    }
}

export async function action({ request }) {
    const form = await request.formData();
    const name = form.get("name");
    const username = form.get("username");
    const password = form.get("password");

    if (typeof name !== "string" || typeof username !== "string" || typeof password !== "string") {
        return json(
            {
                formError: `Form not submitted correctly.`,
            },
            { status: 400 }
        );
    }

    const fields = { name, username, password };

    const validateUsernameFull = async (username) => {
        if (validateUsername(username)) return validateUsername(username);
        if (await doesUserExist(username)) return "User already exists";
    };

    const fieldErrors = {
        name: validateName(name),
        username: await validateUsernameFull(username),
        password: validatePassword(password),
    };

    if (Object.values(fieldErrors).some(Boolean)) {
        return json({ fieldErrors, fields }, { status: 400 });
    }

    //

    const user = await register({ name, username, password });

    if (!user) {
        return json(
            {
                fields,
                formError: `Something went wrong`,
            },
            { status: 400 }
        );
    }

    return redirect("/login?registered=true");
}

export default function Signup() {
    const actionData = useActionData();
    const [searchParams] = useSearchParams();

    return (
        <div className="page-login">
            <Logo />

            <h1>Sign up</h1>

            <Form method="post">
                <input
                    type="hidden"
                    name="redirectTo"
                    value={searchParams.get("redirectTo") ?? ""}
                />

                <label className="page-login__label">
                    Name
                    <input
                        type="text"
                        name="name"
                        className="page-login__input"
                        defaultValue={actionData?.fields?.name}
                    />
                    {actionData?.fieldErrors?.name && (
                        <p className="page-login__error">{actionData.fieldErrors.name}</p>
                    )}
                </label>

                <label className="page-login__label">
                    Email
                    <input
                        type="text"
                        name="username"
                        className="page-login__input"
                        defaultValue={actionData?.fields?.username}
                    />
                    {actionData?.fieldErrors?.username && (
                        <p className="page-login__error">{actionData.fieldErrors.username}</p>
                    )}
                </label>

                <label className="page-login__label">
                    Password
                    <input
                        name="password"
                        type="password"
                        className="page-login__input"
                        defaultValue={actionData?.fields?.password}
                    />
                    {actionData?.fieldErrors?.password && (
                        <p className="page-login__error">{actionData.fieldErrors.password}</p>
                    )}
                </label>

                <button type="submit" className="page-login__button">
                    Sign up
                </button>

                {actionData?.formError && (
                    <p className="page-login__error">{actionData.formError}</p>
                )}

                <p className="page-login__footer">
                    Have an account? <Link to="/auth/login">Log in</Link>
                </p>
            </Form>
        </div>
    );
}
