import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { tr } from "date-fns/locale";
import { Heart } from "@phosphor-icons/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Entry(props) {
  const [entry, setEntry] = useState(props.item);

  const user = useSelector((depo) => depo.user);

  const didUserLikeThis = true;

  const formattedDate = formatDistanceToNow(new Date(entry.created_at), {
    addSuffix: true,
    locale: tr,
  });

  function handleLike() {
    if (user) {
      const likeData = {
        owner_id: user.id,
        entry_id: entry.id,
        token: localStorage.getItem("insta"),
      };

      axios({
        method: didUserLikeThis ? "DELETE" : "POST",
        url: "https://wit-courses.onrender.com/like",
        data: likeData,
      })
        .then((res) => {
          if (res.status === 201) {
            setEntry({
              ...entry,
              like_count: didUserLikeThis
                ? Number(entry.like_count) - 1
                : Number(entry.like_count) + 1,
            });
          }
        })
        .catch((err) => console.log(err.data));
    } else {
      toast.info("Giriş yapman gerekiyor");
    }
  }

  return (
    <article className="bg-white text-black rounded-md">
      <div className="flex items-center p-2">
        <img
          className="w-8 h-8 mr-3 rounded-full"
          src="https://d2ph5fj80uercy.cloudfront.net/06/cat1589.jpg"
          alt=""
        />
        <h3 className="font-bold flex-1">{entry.owner_name}</h3>
        <div className="text-stone-600 text-sm">{formattedDate}</div>
      </div>

      <img src={entry.img_url} alt="" />
      <div className="p-2">
        <div className="flex items-center gap-1">
          <button onClick={handleLike}>
            {didUserLikeThis ? (
              <Heart size={28} color="hotpink" weight="fill" />
            ) : (
              <Heart size={28} />
            )}
          </button>
          <div className="font-bold">{Number(entry.like_count)}</div>
        </div>
        <div className="font-bold">{entry.body}</div>
      </div>
    </article>
  );
}
