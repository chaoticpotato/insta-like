import { NavLink, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function MainNavigation(props) {
  // console.log("mainNav props", props);

  const history = useHistory();

  function handleLogout() {
    localStorage.removeItem("insta");
    props.setUser(null);
    toast.success("Çıkış başarılı", {
      autoClose: 1500,
    });
    setTimeout(() => {
      history.push("/login");
    }, 2000);
  }

  // console.log("Nav içi user", props.user);

  return (
    <nav
      className="text-lg py-2 font-bold flex gap-2 justify-center"
      key={props.user?.id}
    >
      <NavLink to="/" exact activeClassName="text-yellow-500">
        Anasayfa
      </NavLink>
      {props.user && (
        <NavLink to="/me" activeClassName="text-yellow-500">
          Profil
        </NavLink>
      )}
      {props.user ? (
        <button onClick={handleLogout}>Çıkış</button>
      ) : (
        <NavLink to="/login" activeClassName="text-yellow-500">
          Giriş
        </NavLink>
      )}
    </nav>
  );
}
