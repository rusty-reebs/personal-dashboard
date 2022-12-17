import { useState } from "react";
import { Loader } from "@mantine/core";
import useSWR from "swr";
import { db } from "../../src/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { format } from "date-fns";

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
          const document = await setDoc(docRef, {
            cad: response.cad,
            // btc: btc.result,
            date: response.date,
          });

          console.log(document);
        } catch (err) {
          console.log(err.toString());
        }
      }
    } catch (err) {
      console.log(err.toString());
    }
  };

  updateCurrency();

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <Loader variant="dots" color="#AF0404" className="mx-auto mb-8" />
      ) : (
        <div className="flex flex-col">
          <div>1 USD = {CAD} CAD</div>
          <div>BTC Price = {BTC}</div>
        </div>
      )}
    </div>
  );
}
