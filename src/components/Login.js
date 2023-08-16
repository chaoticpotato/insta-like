import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

export default function Login(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUser } = props;

  const history = useHistory();

  const gonder = (data) => {
    // request -> https://wit-courses.onrender.com/login, data
    axios
      .post("https://wit-courses.onrender.com/login", data)
      .then((response) => {
        localStorage.setItem("insta", response.data.token);
        // yönlendirme işlemi
        // feedback vermek
        toast.success("Giriş başarılı, anasayfaya yönlendiriliyorsun");
        const user = jwt_decode(response.data.token);
        setUser(user);
        setTimeout(() => {
          history.push("/");
        }, 3000);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-w-[250px] mx-auto">
      <h1 className="text-2xl font-bold text-amber-600 text-center">
        Giriş yap
      </h1>
      <form onSubmit={handleSubmit(gonder)}>
        <label className="flex flex-col gap-1 py-1">
          <span className="flex justify-between items-baseline">
            Email{" "}
            {errors.email && (
              <span className="text-red-700 text-sm">Bu alan gerekli</span>
            )}
          </span>
          <input
            className="h-8 px-2 rounded text-black"
            type="email"
            {...register("email", { required: true })}
          />
        </label>
        <label className="flex flex-col gap-1 py-2">
          <span className="flex justify-between items-baseline">
            Şifre{" "}
            {errors.password && (
              <span className="text-red-700 text-sm">Bu alan gerekli</span>
            )}
          </span>
          <input
            className="h-8 px-2 rounded text-black"
            type="password"
            {...register("password", { required: true })}
          />
        </label>
        <div className="text-center">
          <button
            type="submit"
            className="flex-[2] bg-amber-600 py-2 px-4 rounded text-white"
          >
            Giriş Yap
          </button>
        </div>
      </form>
    </div>
  );
}
