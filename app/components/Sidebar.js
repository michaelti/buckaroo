import { NavLink, Link } from "remix";
import Logo from "./Logo";

export default function Sidebar() {
    return (
        <header className="Sidebar">
            <Logo />
            <nav className="Sidebar__menu">
                <NavLink to="/dashboard" className="Sidebar__menu-item">
                    Dashboard
                </NavLink>
                <NavLink to="/accounts" className="Sidebar__menu-item">
                    Accounts
                </NavLink>
                <NavLink to="/pouches" className="Sidebar__menu-item">
                    Pouches
                </NavLink>
            </nav>
            <nav className="Sidebar__menu Sidebar__menu--secondary">
                <NavLink to="/settings" className="Sidebar__menu-item">
                    Settings
                </NavLink>
                <Link to="/auth/logout" className="Sidebar__menu-item">
                    Log Out
                </Link>
            </nav>
        </header>
    );
}
