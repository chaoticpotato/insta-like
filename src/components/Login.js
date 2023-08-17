import { useForm } from "react-hook-form";
import { login } from "./../store/actions";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const history = useHistory();

  const gonder = (data) => {
    dispatch(login(data, history));
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
