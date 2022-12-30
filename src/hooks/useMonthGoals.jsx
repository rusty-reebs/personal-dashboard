import { db } from "../firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useMonthGoals() {
  const [state, setState] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const docRef = doc(db, "data", "transactions");

  useEffect(() => {
    const getRecord = async () => {
      const record = await getDoc(docRef);
      const result = record.data();
      console.log(result);
      setState({
        heloc: result.heloc,
        travel: result.travel,
        maint: result.maint,
      });
      setIsLoading(false);
    };
    getRecord();
  }, []);

  return { isLoading, state };
}
