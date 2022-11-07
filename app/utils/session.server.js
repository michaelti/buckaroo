import bcrypt from "bcryptjs";
import User from "../../db/models/user";
import { createCookieSessionStorage, redirect } from "remix";

export async function login({ username, password }) {
    const user = await User.query().findOne({ email: username });

    if (!user) return null;

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) return null;

    return { id: user.id, username };
}

const storage = createCookieSessionStorage({
    cookie: {
        name: "buckaroo_session",
        secure: process.env.NODE_ENV === "production",
        secrets: [process.env.SESSION_SECRET],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
    },
});

export async function createUserSession(userId, redirectTo) {
    const session = await storage.getSession();
    session.set("userId", userId);

    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await storage.commitSession(session),
        },
    });
}

export async function getUserId(request) {
    const session = await storage.getSession(request.headers.get("Cookie"));
    const userId = session.get("userId");

    if (!userId) return null;

    return userId;
}

export async function requireUserId(request, redirectTo = new URL(request.url).pathname) {
    const session = await storage.getSession(request.headers.get("Cookie"));
    const userId = session.get("userId");

    if (!userId) {
        const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
        throw redirect(`/auth/login?${searchParams}`);
    }

    return userId;
}

export async function getUser(request) {
    const userId = await getUserId(request);

    try {
        const user = await User.query().findById(userId);
        return user;
    } catch {
        throw logout(request);
    }
}

export async function logout(request) {
    const session = await storage.getSession(request.headers.get("Cookie"));

    return redirect("/auth/login", {
        headers: {
            "Set-Cookie": await storage.destroySession(session),
        },
    });
}

export async function register({ name, username, password }) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.query().insert({
        name,
        email: username,
        password: passwordHash,
    });

    delete user.password;

    return user;
}

export async function doesUserExist(username) {
    const user = await User.query().findOne({ email: username });

    return Boolean(user);
}
