import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "remix";
import rootStyles from "./styles/root.css";
import componentStyles from "./styles/components.css";
import Sidebar from "./components/Sidebar";
import { useMatches, useCatch } from "remix";

export function links() {
    return [
        // temp: google fonts
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap",
        },
        { rel: "stylesheet", href: rootStyles },
        { rel: "stylesheet", href: componentStyles },
    ];
}

function Layout({ children }) {
    const matches = useMatches();
    const hideSidebar = matches.some((match) => match.handle?.hideSidebar);

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <title>Buckaroo</title>
                <Meta />
                <Links />
            </head>
            <body data-hide-sidebar={hideSidebar}>
                {!hideSidebar && <Sidebar />}
                <main>{children}</main>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

export default function App() {
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
}

export function ErrorBoundary({ error }) {
    console.error(error);

    return (
        <Layout>
            <p>Something went wrong</p>
        </Layout>
    );
}

export function CatchBoundary() {
    const caught = useCatch();

    return (
        <Layout>
            <p>
                {caught.status} {caught.statusText}
            </p>
        </Layout>
    );
}
