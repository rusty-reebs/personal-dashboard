import { useEffect, useState } from "react";
import { ActionIcon, Loader } from "@mantine/core";
import { FiArchive, FiExternalLink } from "react-icons/fi";
import { FaGetPocket } from "react-icons/fa";
import { BsStar, BsStarFill, BsTrash2 } from "react-icons/bs";

export default function Pocket() {
  const [all, setAll] = useState([]);
  const [reads, setReads] = useState(all);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [view, setView] = useState("all");

  useEffect(() => {
    const getPocket = async () => {
      try {
        const result = await fetch(
          `${
            import.meta.env.DEV
              ? "http://localhost:9999/.netlify/functions/getPocket"
              : "/.netlify/functions/getPocket"
          }`
        );

        const resultText = await result.text();
        const resultParsed = JSON.parse(resultText);
        const listObjects = Object.values(resultParsed.list);
        console.log("listObjects", listObjects);
        setAll(listObjects);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setErrorMessage(err.toString());
      }
    };
    getPocket();
  }, []);

  useEffect(() => {
    if (view === "all") {
      setReads(all);
    }
    if (view === "favorites") {
      setReads(all.filter((obj) => obj.favorite === "1"));
    }
    if (view === "archive") {
      setReads(all.filter((obj) => obj.status === "1"));
    }
  }, [all, view]);

  const handleDelete = async (item_id) => {
    try {
      const result = await fetch(
        `${
          import.meta.env.DEV
            ? `http://localhost:9999/.netlify/functions/actionPocket?action=delete&id=${item_id}`
            : `/.netlify/functions/actionPocket`
        }`
      );
      const resultText = await result.text();
      const parsed = await JSON.parse(resultText);
      if (parsed.status == 1) {
        setReads((prev) => prev.filter((obj) => obj.item_id !== item_id));
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(err.toString());
    }
  };

  return (
    <div className="col-start-3 row-span-2 flex flex-col gap-4 py-8 px-6 rounded-lg bg-four border-[0.5px] border-three text-five">
      <div className="flex flex-row justify-between">
        <p className="text-lg inline-flex gap-1">
          <ActionIcon variant="filled">
            <FaGetPocket className="text-red-500 self-center" size={20} />
          </ActionIcon>
          Saved Reads
        </p>
        <select
          placeholder="Select"
          className="bg-four p-1 text-xs border border-three rounded-md"
          value={view}
          onChange={(e) => setView(e.currentTarget.value)}
        >
          <option value="all">All</option>
          <option value="favorites">Favorites</option>
          <option value="archive">Archive</option>
        </select>
      </div>
      <div className="flex flex-col overflow-y-auto">
        {isError ? (
          <div className="mx-auto my-auto">⚠️ {errorMessage}</div>
        ) : isLoading ? (
          <Loader variant="dots" color="#AF0404" className="mx-auto my-auto" />
        ) : (
          <div className="flex flex-col">
            {reads?.map((each) => (
              <div
                key={each.item_id}
                className="group flex flex-row justify-between text-sm py-2 px-3 hover:py-[0.427rem] hover:border hover:border-three hover:rounded-md hover:bg-one"
              >
                <a
                  className="flex flex-col basis-2/3 hover:cursor-pointer"
                  href={each.resolved_url}
                  target="_blank"
                >
                  <div className="">{each.resolved_title}</div>
                  <div className="italic text-xs whitespace-nowrap">
                    {each.time_to_read ? `${each?.time_to_read} MIN` : ""}
                  </div>
                </a>
                <div className="hidden group-hover:flex flex-row">
                  <ActionIcon variant="filled">
                    {each.favorite == "1" ? (
                      <BsStarFill size={15} className="text-yellow-300" />
                    ) : (
                      <BsStar size={15} />
                    )}
                  </ActionIcon>
                  <ActionIcon variant="filled">
                    <FiArchive size={15} />
                  </ActionIcon>
                  <ActionIcon
                    variant="filled"
                    onClick={() => handleDelete(each.item_id)}
                  >
                    <BsTrash2 size={15} />
                  </ActionIcon>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
