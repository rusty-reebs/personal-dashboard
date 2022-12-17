import { db } from "../../src/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { format } from "date-fns";

exports.handler = async function (event, context) {
  // needs to check if currency has been fetched today already
  // check the firestore for existing currency, and if not, get the currency and then save it to db
  // then return the data

  const docRef = doc(db, "data", "currency");
  try {
    const record = await getDoc(docRef);
    const result = record.data();
    console.log(result);
    const today = format(new Date(), "MMM d");
    console.log("👉 today", today);
    const resultDate = format(new Date(result.date.seconds * 1000), "MMM d");
    console.log("👉 resultDate", resultDate);
    if (
      format(new Date(), "MMM d") ===
      format(new Date(result.date.seconds * 1000), "MMM d")
    ) {
      return {
        statusCode: 200,
        body: JSON.stringify({ date: true, data: result }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ date: false }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      };
    }
  } catch (err) {
    console.log(err);
  }
};
