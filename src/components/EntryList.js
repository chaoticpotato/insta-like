import { useState, useEffect } from "react";
import axios from "axios";
import Entry from "./Entry";

export default function EntryList(props) {
  const [content, setContent] = useState(null);

  const target = props.userId ? props.userId : "";

  useEffect(() => {
    axios
      .get("https://wit-courses.onrender.com/entries/" + target)
      .then((res) => {
        const imgPosts = res.data.filter((entry) => entry.img_url);
        setContent(imgPosts);
      })
      .catch((err) => console.log(err));
  }, [target]);

  return (
    <section className="flex flex-col gap-4">
      {/* content?.map((entry) => (
        <Entry item={entry} />
      )) */}
      {content
        ? content.map((entry) => <Entry key={entry.id} item={entry} />)
        : "yükleniyor..."}
    </section>
  );
}
