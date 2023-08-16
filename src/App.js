import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import MainNavigation from "./components/MainNavigation";
import Login from "./components/Login";
import EntryList from "./components/EntryList";
import { checkLsForUser } from "./utils";
import NewEntry from "./components/NewEntry";

/*
localstorage'a bak
"insta" keyinde bir string varsa, bunu çözümle
  çıkan objeyi user objesinin başlangıç değeri olarak verr
yoksa
  user = null
*/

function App() {
  const userFromLs = checkLsForUser();
  const [user, setUser] = useState(userFromLs);

  // console.log("içerdeki kullanıcı", user);

  return (
    <div className="container max-w-[480px] mx-auto">
      <MainNavigation user={user} setUser={setUser} />

      <Switch>
        <Route path="/" exact>
          <EntryList />
        </Route>

        {user && (
          <Route path="/me">
            <NewEntry userId={user.id} />
            <EntryList userId={user.id} />
          </Route>
        )}

        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
