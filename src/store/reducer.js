import { toast } from "react-toastify";
import { checkLsForUser } from "./../utils";

const initialStore = {
  user: checkLsForUser(),
  allEntries: null,
  myEntries: null,
};

export function memur(state = initialStore, action) {
  switch (action.type) {
    case "logout":
      let history = action.payload;

      localStorage.removeItem("insta");
      toast.success("Çıkış başarılı", {
        autoClose: 1500,
      });

      setTimeout(() => {
        history.push("/login");
      }, 2000);

      return { ...state, user: null };

    case "login":
      return { ...state, user: action.payload };

    case "allEntries":
      return { ...state, allEntries: action.payload };

    case "myEntries":
      return { ...state, myEntries: action.payload };

    default:
      return state;
  }
}
