import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

export default function Entry(props) {
  console.log(props.item);
  const formattedDate = formatDistanceToNow(new Date(props.item.created_at), {
    addSuffix: true,
    locale: tr,
  });

  return (
    <article className="bg-white text-black rounded-md">
      <div className="flex items-center p-2">
        <img
          className="w-8 h-8 mr-3 rounded-full"
          src="https://d2ph5fj80uercy.cloudfront.net/06/cat1589.jpg"
          alt=""
        />
        <h3 className="font-bold flex-1">cute_animals - burası değişecek</h3>
        <div className="text-stone-600 text-sm">{formattedDate}</div>
      </div>

      <img src={props.item.img_url} alt="" />
      <div className="p-2">
        <div className="text-sm">like, like sayısı</div>
        <div className="font-bold">{props.item.body}</div>
      </div>
    </article>
  );
}
