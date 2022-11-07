import { Link, useSearchParams, useActionData, json, Form } from "remix";
import { login, createUserSession } from "~/utils/session.server";
import Logo from "../../components/Logo";

export async function action({ request }) {
    const form = await request.formData();
    const username = form.get("username");
    const password = form.get("password");
    const redirectTo = form.get("redirectTo") || "/";

    if (
        typeof username !== "string" ||
        typeof password !== "string" ||
        typeof redirectTo !== "string"
    ) {
        return json(
            {
                formError: `Form not submitted correctly.`,
            },
            { status: 400 }
        );
    }

    const fields = { username, password };

    const user = await login({ username, password });

    if (!user) {
        return json(
            {
                fields,
                formError: `Incorrect username or password`,
            },
            { status: 401 }
        );
    }

    return createUserSession(user.id, redirectTo);
}

export default function Login() {
    const actionData = useActionData();
    const [searchParams] = useSearchParams();

    return (
        <div className="page-login">
            <Logo />

            {searchParams.get("registered") && (
                <span className="page-login__registered">Success! You can now log in.</span>
            )}

            <h1>Log in</h1>

            <Form method="post">
                <input
                    type="hidden"
                    name="redirectTo"
                    value={searchParams.get("redirectTo") ?? ""}
                />

                <label className="page-login__label">
                    Email
                    <input
                        type="text"
                        name="username"
                        className="page-login__input"
                        defaultValue={actionData?.fields?.username}
                    />
                </label>

                <label className="page-login__label">
                    Password
                    <input
                        name="password"
                        type="password"
                        className="page-login__input"
                        defaultValue={actionData?.fields?.password}
                    />
                </label>

                <button type="submit" className="page-login__button">
                    Log in
                </button>

                {actionData?.formError && (
                    <p className="page-login__error">{actionData.formError}</p>
                )}

                <p className="page-login__footer">
                    Need an account? <Link to="/auth/signup">Sign up</Link>
                </p>
            </Form>
        </div>
    );
}
