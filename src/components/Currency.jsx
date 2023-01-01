import { useState } from "react";
import { Image, Loader } from "@mantine/core";
import { db } from "../../src/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function Currency() {
  const [CAD, setCAD] = useState("");
  const [BTC, setBTC] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const docRef = doc(db, "data", "currency");

  const updateCurrency = async () => {
    try {
      const res = await fetch(
        `${
          import.meta.env.DEV
            ? "http://127.0.0.1:9999/.netlify/functions/getDate"
            : "/.netlify/functions/getDate"
        }`
      );
      const text = await res.text();
      const response = JSON.parse(text);
      if (response.date) {
        // use data from db
        setCAD(response.data.cad);
        setBTC(response.data.btc);
        setIsLoading(false);
      } else {
        // get new currency data and save to db
        try {
          const res = await fetch(
            `${
              import.meta.env.DEV
                ? "http://127.0.0.1:9999/.netlify/functions/getCad"
                : "/.netlify/functions/getCad"
            }`
          );
          const text = await res.text();
          const response = JSON.parse(text);
          // update db
          await updateDoc(docRef, {
            cad: response.cad,
            date: response.date,
          });
          setCAD(response.cad);
        } catch (err) {
          console.log(err.toString());
        }
        try {
          const res = await fetch(
            `${
              import.meta.env.DEV
                ? "http://127.0.0.1:9999/.netlify/functions/getBtc"
                : "/.netlify/functions/getBtc"
            }`
          );
          const text = await res.text();
          const response = JSON.parse(text);

          await updateDoc(docRef, {
            btc: response.btc,
          });
          setBTC(response.btc);
        } catch (err) {
          console.log(err.toString());
        }
      }
    } catch (err) {
      console.log(err.toString());
    }
  };

  updateCurrency();

  const btcString = parseFloat(BTC).toFixed(0).toString();
  const btcWithComma = btcString.slice(0, 2) + "," + btcString.slice(2);

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <Loader variant="dots" color="#AF0404" className="mx-auto mb-8" />
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-2">
            1
            <Image src="/img/united.png" alt="usd" height={20} width={20} /> = $
            {parseFloat(CAD).toFixed(3)}
            <span className="text-xs ml-2.5">
              <Image src="/img/canada.png" alt="cdn" height={20} width={20} />
            </span>
          </div>
          <div className="flex flex-row items-center gap-2">
            1
            <span className="text-xs">
              <Image src="/img/bitcoin.png" alt="btc" height={20} width={20} />
            </span>
            = ${btcWithComma}
            <span className="text-xs">
              <Image src="/img/united.png" alt="usd" height={20} width={20} />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
