import axios from "axios";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

export const logout = (history) => {
  return { type: "logout", payload: history };
};

export const login = (formData, history) => (dispatch) => {
  return axios
    .post("https://wit-courses.onrender.com/login", formData)
    .then((response) => {
      localStorage.setItem("insta", response.data.token);
      toast.success("Giriş başarılı, anasayfaya yönlendiriliyorsun");
      const user = jwt_decode(response.data.token);

      dispatch({ type: "login", payload: user });

      setTimeout(() => {
        history.push("/");
      }, 3000);
    })
    .catch((error) => console.log(error));
};

export const addEntry = (newEntryObj, callback) => async (dispatch) => {
  const token = localStorage.getItem("insta");

  return axios
    .post("https://wit-courses.onrender.com/entries", newEntryObj, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.status === 201) {
        toast.success("İçerik başarıyla eklendi!");
        callback();
      }
    })
    .catch((err) => console.log(err));
};
