import { NavLink, Outlet, useLocation } from "react-router-dom";

const Header = () => {

  const { pathname } = useLocation();

  return (
    <>
      <header className="p-5 border-b border-b-border mb-10 relative  text-primary">
        <h2 className="text-xl font-bold absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          Mulinari Financeiro
        </h2>
        <ul className="flex gap-4">
          <li className="font-semibold transition-all">
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to="/"
            >
              Inicio
            </NavLink>
          </li>
          <li className={`font-semibold ${pathname.includes("cadastro") && "underline"}   transition-all`}>
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to={"/cadastro/servico"}
            >
              Cadastro
            </NavLink>
          </li>
        </ul>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
