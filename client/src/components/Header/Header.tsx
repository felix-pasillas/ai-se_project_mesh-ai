import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Header.css";
import logo from "../../assets/logo.png";
import chevronIcon from "../../assets/icon-chevron-down.svg";
import logoutIcon from "../../assets/icon-logout.svg";

type Props = {
  onMenuOpen: () => void;
  onMenuClose: () => void;
  isMobileMenuOpen: boolean;
};

export default function Header({
  onMenuOpen,
  onMenuClose,
  isMobileMenuOpen,
}: Props) {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  function getNavLinkClass({ isActive }: { isActive: boolean }) {
    return isActive
      ? "header__link header__link--active"
      : "header__link";
  }

  function handleLogout() {
    setIsAccountMenuOpen(false);
    onMenuClose();
    logout();
  }

  return (
    <header className={isMobileMenuOpen ? "header header_mobile" : "header"}>
      <button
        type="button"
        className="header__menu-btn"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        onClick={isMobileMenuOpen ? onMenuClose : onMenuOpen}
      />
      <img src={logo} alt="Mesh AI" className="header__logo" />
      <nav
        className={
          isMobileMenuOpen ? "header__nav header__nav_mobile" : "header__nav"
        }
      >
        {isAuthenticated && (
          <>
            <NavLink
              to="/knowledge"
              className={getNavLinkClass}
              onClick={onMenuClose}
            >
              Knowledge Base
            </NavLink>
            <NavLink
              to="/chat"
              className={getNavLinkClass}
              onClick={onMenuClose}
            >
              Chat
            </NavLink>

            <div className="header__account">
              <button
                type="button"
                className={
                  isAccountMenuOpen
                    ? "header__dropdown-btn header__dropdown-btn_open"
                    : "header__dropdown-btn"
                }
                aria-haspopup="menu"
                aria-expanded={isAccountMenuOpen}
                onClick={() => setIsAccountMenuOpen((open) => !open)}
              >
                {currentUser?.name}'s Account
                <img src={chevronIcon} alt="" className="header__chevron" />
              </button>

              {isAccountMenuOpen && (
                <ul className="header__menu" role="menu">
                  <li role="none">
                    <button
                      type="button"
                      role="menuitem"
                      className="header__menu-item"
                      onClick={handleLogout}
                    >
                      Logout
                      <img
                        src={logoutIcon}
                        alt=""
                        className="header__menu-icon"
                      />
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  );
}