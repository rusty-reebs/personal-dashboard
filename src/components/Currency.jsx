import { useState } from "react";
import { Loader } from "@mantine/core";
import { db } from "../../src/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function Currency() {
  const [CAD, setCAD] = useState("");
  const [BTC, setBTC] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // const fetcher = () =>
  //   fetch(
  //     `https://api.apilayer.com/exchangerates_data/convert?to=cad&from=usd&amount=1`,
  //     {
  //       mode: "cors",
  //       headers: {
  //         apikey: `${import.meta.env.VITE_CURRENCY_API_KEY}`,
  //       },
  //     }
  //   ).then((result) => result.json());

  //   const { data, isLoading } = useSWR(`/currency`, fetcher, {
  //     refreshInterval: 300000,
  //   });

  const updateCurrency = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:9999/.netlify/functions/getDate"
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
            "http://127.0.0.1:9999/.netlify/functions/getCad"
          );
          const text = await res.text();
          const response = JSON.parse(text);
          console.log(response);

          // update db
          const docRef = doc(db, "data", "currency");
          const document = await updateDoc(docRef, {
            cad: response.cad,
            date: response.date,
          });
          setCAD(response.cad);
        } catch (err) {
          console.log(err.toString());
        }
        try {
          const res = await fetch(
            "http://127.0.0.1:9999/.netlify/functions/getBtc"
          );
          const text = await res.text();
          const response = JSON.parse(text);
          console.log(response);

          const docRef = doc(db, "data", "currency");
          const document = await updateDoc(docRef, {
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
          <div>
            1 <span className="text-xs">USD</span> = $
            {parseFloat(CAD).toFixed(3)} <span className="text-xs">CAD</span>
          </div>
          <div>
            1 <span className="text-xs">BTC</span> = ${btcWithComma}{" "}
            <span className="text-xs">USD</span>
          </div>
        </div>
      )}
    </div>
  );
}
