import { db } from "../../src/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { format } from "date-fns";
import axios from "axios";

exports.handler = async function (event, context) {
  // needs to check if currency has been fetched today already
  // check the firestore for existing currency, and if not, get the currency and then save it to db
  // then return the data
  const headers = {
    headers: {
      apikey: `${process.env.VITE_CURRENCY_API_KEY}`,
    },
  };

  const docRef = doc(db, "data", "currency");
  try {
    const record = await getDoc(docRef);
    const result = record.data();
    console.log(result);
    if (
      format(new Date(), "MMM d") ===
      format(new Date(result.date.seconds * 1000), "MMM d")
    ) {
      return {
        statusCode: 200,
        body: { message: "date is equal", result: result },
      };
    } else {
      //fetch
      const cad = await axios(
        "http://api.apilayer.com/exchangerates_data/convert?to=cad&from=usd&amount=1",
        headers
      );
      const btc = await axios(
        "http://api.apilayer.com/exchangerates_data/convert?to=usd&from=btc&amount=1",
        headers
      );

      console.log(cad.data);
      console.log(btc.data);
      //update db
      // await setDoc(docRef, {
      //   cad: cad.result,
      //   btc: btc.result,
      //   date: cad.info.timestamp * 1000,
      // });

      //return fetched data
      return {
        statusCode: 200,
        body: "ok",
        // body: { cad: cad.result, btc: btc.result },
      };
    }
  } catch (err) {
    console.log(err);
  }
};
