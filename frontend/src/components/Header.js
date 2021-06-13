import { NavLink } from "react-router-dom";
import "./Header.scss";

function Header() {
    return (
        <header className="header">
            <h1 className="header__title">Buckaroo</h1>
            <nav className="header__menu">
                <NavLink to="/" exact className="header__menu-item">
                    Dashboard
                </NavLink>
                <NavLink to="/insights" className="header__menu-item">
                    Insights
                </NavLink>
            </nav>
            <nav className="header__menu header__menu--secondary">
                <NavLink to="/help" exact className="header__menu-item">
                    Help
                </NavLink>
                <NavLink to="/settings" className="header__menu-item">
                    Settings
                </NavLink>
                <NavLink to="/log-out" className="header__menu-item">
                    Log Out
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;
