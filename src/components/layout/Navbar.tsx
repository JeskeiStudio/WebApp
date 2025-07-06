import { NavLink } from 'react-router-dom';
import { SimpleConnectButton } from '../features/wallet/ConnectButton';

export function Navbar() {
  const linkClass =
    'text-gray-600 hover:text-indigo-600 transition-colors font-medium';
  const activeClass = 'text-indigo-600';

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="text-2xl font-extrabold text-indigo-600">
          Jeskei
        </NavLink>

        <nav className="flex items-center gap-6 text-sm">
          <NavLink to="/" end className={({ isActive }) => (isActive ? activeClass : linkClass)}>
            Home
          </NavLink>
          <NavLink to="/upload" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
            Upload
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
            Dashboard
          </NavLink>
          <NavLink to="/dao" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
            Governance
          </NavLink>
        </nav>

        <SimpleConnectButton />
      </div>
    </header>
  );
}
