import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addEntry } from "./../store/actions";

export default function NewEntry(props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  function handleAddEntry(data) {
    const dataWithUserId = { ...data, owner_id: props.userId };
    dispatch(addEntry(dataWithUserId, reset));
  }

  return (
    <div className="border border-white mb-8 py-6 rounded-lg">
      <form
        className="max-w-[320px] mx-auto"
        onSubmit={handleSubmit(handleAddEntry)}
      >
        <h2 className="text-lg mb-2 font-bold">Yeni İçerik Ekle</h2>
        <label className="flex flex-col gap-1 py-1">
          <span className="flex justify-between items-baseline">
            Açıklama{" "}
            {errors.body && (
              <span className="text-red-700 text-sm">Bu alan gerekli</span>
            )}
          </span>
          <textarea
            className="px-2 rounded text-black"
            rows={3}
            type="text"
            {...register("body", { required: true })}
          />
        </label>
        <label className="flex flex-col gap-1 py-2">
          <span className="flex justify-between items-baseline">
            Görsel{" "}
            {errors.img_url && (
              <span className="text-red-700 text-sm">Bu alan gerekli</span>
            )}
          </span>
          <textarea
            className="px-2 rounded text-black"
            rows={3}
            type="text"
            {...register("img_url", { required: true })}
          />
        </label>
        <div className="text-center mt-2">
          <button
            type="submit"
            className="flex-[2] bg-amber-600 py-2 px-4 rounded text-white"
          >
            Fotoğraf Ekle
          </button>
        </div>
      </form>
    </div>
  );
}
