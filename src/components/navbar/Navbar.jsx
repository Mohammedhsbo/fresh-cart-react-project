import React from 'react';
import Logo from '../../assets/images/freshcart-logo.svg';
import { useNavigate, NavLink } from 'react-router-dom';
import styles from "./navbar.module.css";
import { usercontext } from '../../context/usercontext';


export default function Navbar() {
  const navigate = useNavigate();
  const { userlogin, setUserlogin } = React.useContext(usercontext);

  const logout = () => {
    localStorage.removeItem('userToken');
    setUserlogin(null);
    navigate('/login');
  };

  const userLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "Brands", path: "/brands" },
  ];
  
  if (userlogin) {
    userLinks.push({ name: "Cart", path: "/cart" });
    userLinks.push({ name: "My Orders", path: "/my-orders" });
  }

  return (
    <nav className={`${styles.nav} d-flex justify-content-between align-items-center px-4 py-2`}>
      <div className={`${styles.logoo} d-flex align-items-center gap-4`}>
        <img className={styles.img} src={Logo} alt="logo" width="120" />

        <ul className="d-flex list-unstyled m-0 gap-3">
          {userLinks.map(link => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.active} text-decoration-none text-dark`
                    : "text-decoration-none text-dark"
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul className="d-flex gap-3 m-0 p-0">
          {!userlogin && (
            <div className='mt-4 d-flex gap-4'>
              <li>
                <NavLink to="/login" className={`btn btn-success ${styles.login}  `}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={`btn btn-danger ${styles.login}`}>
                  Register
                </NavLink>
              </li>
            </div>
          )}
          {userlogin && (
            <li>
              <button onClick={logout} className={`btn btn-danger ${styles.logout} `}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
