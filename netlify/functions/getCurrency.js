import { db } from "../../src/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

exports.handler = async function (event, context) {
  // needs to check if currency has been fetched today already
  // check the firestore for existing currency, and if not, get the currency and then save it to db
  // then return the data
  try {
    const docRef = doc(db, "data", "currency");
    const result = await getDoc(docRef);
    if (result.exists()) {
      console.log("Doc data:", result.data());
    } else {
      console.log("No such document.");
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.data()),
    };
  } catch (err) {
    console.log(err);
  }
};
