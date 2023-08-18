import { useEffect } from "react";
import Entry from "./Entry";
import { useDispatch, useSelector } from "react-redux";
import { getEntries } from "./../store/actions";

export default function EntryList(props) {
  // const { myEntries, allEntries } = useSelector(depo => depo);
  const myEntries = useSelector((depo) => depo.myEntries);
  const allEntries = useSelector((depo) => depo.allEntries);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEntries(props.url, props.from));
  }, [props.url, props.from]);

  const content = props.from === "main-page" ? allEntries : myEntries;

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
