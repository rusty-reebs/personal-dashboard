import { db } from "../firebase/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActionIcon, Loader } from "@mantine/core";
import { TbEraser } from "react-icons/tb";

export default function Note() {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");
  const docRef = doc(db, "data", "note");

  useEffect(() => {
    async function getContent() {
      try {
        const record = await getDoc(docRef);
        const result = record.data();
        setContent(result.content);
        setIsLoading(false);
      } catch (err) {
        console.log(err.toString());
      }
    }
    getContent();
  }, []);

  const handleSave = async (value) => {
    setIsSaving(true);
    try {
      await updateDoc(docRef, { content: value });
    } catch (err) {
      console.log(err.toString());
    }
    setIsSaving(false);
  };

  const handleErase = async () => {
    setIsSaving(true);
    try {
      await updateDoc(docRef, { content: "" });
    } catch (err) {
      console.log(err.toString());
    }
    setIsSaving(false);
    setContent("");
  };

  return (
    <div className="flex flex-col gap-4 p-8 rounded-lg bg-four border-[0.5px] border-three text-five">
      <div className="flex flex-row justify-between">
        <p className="text-lg">Notes</p>

        {isSaving ? (
          <Loader variant="dots" color="#AF0404" className="self-center" />
        ) : (
          <ActionIcon variant="filled" onClick={handleErase}>
            <TbEraser size={20} />
          </ActionIcon>
        )}
      </div>
      <div className="">
        {isLoading ? (
          <Loader variant="dots" color="#AF0404" className="mx-auto" />
        ) : (
          <textarea
            className="w-full h-full bg-transparent p-2 focus:outline-three focus:appearance-none resize-none"
            rows={8}
            value={content}
            onChange={(e) => setContent(e.currentTarget.value)}
            onBlur={() => handleSave(content)}
          ></textarea>
        )}
      </div>
    </div>
  );
}
