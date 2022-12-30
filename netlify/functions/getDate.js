import { db } from "../../src/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { format } from "date-fns";

exports.handler = async function (event, context) {
  const docRef = doc(db, "data", "currency");
  try {
    const record = await getDoc(docRef);
    const result = record.data();
    const today = format(new Date(), "MMM d");
    const resultDate = format(new Date(result.date), "MMM d");
    if (today == resultDate) {
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
