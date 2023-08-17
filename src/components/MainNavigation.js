import { NavLink, useHistory } from "react-router-dom";

import { logout } from "./../store/actions";
import { useDispatch, useSelector } from "react-redux";

export default function MainNavigation() {
  // console.log("mainNav props", props);

  const user = useSelector((depo) => depo.user);

  const history = useHistory();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout(history));
  }

  return (
    <nav
      className="text-lg py-2 font-bold flex gap-2 justify-center"
      key={user?.id}
    >
      <NavLink to="/" exact activeClassName="text-yellow-500">
        Anasayfa
      </NavLink>
      {user && (
        <NavLink to="/me" activeClassName="text-yellow-500">
          Profil
        </NavLink>
      )}
      {user ? (
        <button onClick={handleLogout}>Çıkış</button>
      ) : (
        <NavLink to="/login" activeClassName="text-yellow-500">
          Giriş
        </NavLink>
      )}
    </nav>
  );
}
