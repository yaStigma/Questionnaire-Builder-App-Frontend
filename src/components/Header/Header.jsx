import { NavLink } from "react-router";
import clsx from "clsx";
import CSS from "./Header.module.css";
const getNavLinkClass = (props) => {
  return clsx(CSS.link, props.isActive && CSS.active);
};
export default function Header() {
  return (
    <header className={CSS.wrapper}>
      <div className={CSS.logo}>
        <img src="/favicon.svg" alt="logo image" className={CSS.logoImage} />
        <span className={CSS.logoText}>Quiz Point</span>
      </div>
      <nav className={CSS.navigation}>
        <NavLink to="/" className={getNavLinkClass}>
          Catalog
        </NavLink>
        <NavLink to="/quiz/create" className={getNavLinkClass}>
          Create Quiz
        </NavLink>
      </nav>
    </header>
  );
}
