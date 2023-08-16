import jwt_decode from "jwt-decode";
import { isPast } from "date-fns";

export function checkLsForUser() {
  const token = localStorage.getItem("insta");
  if (token) {
    const user = jwt_decode(token);
    // exp geçtiyse, yine null olsun
    const isTokenExpired = isPast(new Date(user.exp * 1000));
    if (isTokenExpired) {
      localStorage.removeItem("insta");
      return null;
    } else {
      return user;
    }
  } else {
    return null;
  }
}
