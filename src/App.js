import { Route, Switch } from "react-router-dom";
import "./App.css";
import MainNavigation from "./components/MainNavigation";
import Login from "./components/Login";
import EntryList from "./components/EntryList";
import NewEntry from "./components/NewEntry";
import { useSelector } from "react-redux";

/*
 - redux, react-redux lib kur -done
 - bir memur fonksiyonu oluşturmak (reducer) -done
 - createStore ile depo yaratmak -done
 - depoyu Provider ile index.js te kullanmak -done
 - actions oluşturmak

 - asnyc bir actions varsa thunk middleware'i eklemek

 - depodan bi şey kullanırken useSelector
 - depoya bi şey yazarken useDispatch 
 */

/*
localstorage'a bak
"insta" keyinde bir string varsa, bunu çözümle
  çıkan objeyi user objesinin başlangıç değeri olarak verr
yoksa
  user = null
*/

/*
Güncellemeler:
- action hatası düzeltmek -done

- Endpoint değişiklikleri
  - DÜZELTME/entries/:owner_id -> kullanıcının like edip etmediğini getirecek

  - like bilgisi içermeyen -> /entries
  - YENİ: tüm entrylerin ve like bilgisini getiren -> /entriesWithLikes/:user_id

- EntryList prop değişiklikleri
- like/dislike kısmını yapmak
*/

function App() {
  const user = useSelector((depo) => depo.user);

  // console.log("içerdeki kullanıcı", user);

  return (
    <div className="container max-w-[480px] mx-auto">
      <MainNavigation />

      <Switch>
        <Route path="/" exact>
          <EntryList
            from="main-page"
            url={user ? "/entriesWithLikes/" + user.id : "/entries"}
          />
        </Route>

        {user && (
          <Route path="/me">
            <NewEntry userId={user.id} />
            {/* https://wit-courses.onrender.com/entries/1 */}
            <EntryList from="profile-page" url={"/entries/" + user.id} />
          </Route>
        )}

        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
