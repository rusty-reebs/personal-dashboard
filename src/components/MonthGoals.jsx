import { Checkbox, Loader } from "@mantine/core";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";

export default function MonthGoals() {
  const [state, setState] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [toggleUpdate, setToggleUpdate] = useState(false);

  const today = new Date();
  const month = format(new Date(today), "MMMM");
  const docRef = doc(db, "data", "transactions");

  useEffect(() => {
    async function getData() {
      const record = await getDoc(docRef);
      const result = record.data();
      if (month != result.month) {
        const newMonth = {
          month: month,
          heloc: false,
          travel: false,
          maint: false,
        };
        try {
          await updateDoc(docRef, newMonth);
          setState(newMonth);
        } catch (err) {
          console.log(err);
        }
      } else {
        setState({
          heloc: result.heloc,
          travel: result.travel,
          maint: result.maint,
        });
      }
      setIsLoading(false);
    }
    getData();
  }, [toggleUpdate]);

  const handleCheck = async (payment) => {
    switch (payment) {
      case "heloc":
        async function updateHeloc() {
          await updateDoc(docRef, { heloc: true });
          setState((prev) => ({ ...prev, heloc: true }));
        }
        await updateHeloc();
        break;
      case "travel":
        async function updateTravel() {
          await updateDoc(docRef, { travel: true });
          setState((prev) => ({ ...prev, travel: true }));
        }
        await updateTravel();
        break;
      case "maint":
        async function updateMaint() {
          await updateDoc(docRef, { maint: true });
          setState((prev) => ({ ...prev, maint: true }));
        }
        await updateMaint();
        break;
      default:
        throw new Error();
    }
    setToggleUpdate((prev) => !prev);
  };

  const checkboxStyle = {};

  return (
    <div className="flex flex-col gap-4 p-8 rounded-lg bg-four border-[0.5px] border-three text-five">
      <p className="text-lg">{format(new Date(today), "MMMM yyyy")}</p>
      <div className="flex flex-col gap-3">
        {isLoading ? (
          <Loader variant="dots" color="#AF0404" className="mx-auto mt-10" />
        ) : (
          <>
            <div className="flex flex-row gap-3">
              <Checkbox
                size="sm"
                color="dark"
                checked={state.heloc}
                onChange={() => (!state?.heloc ? handleCheck("heloc") : null)}
              />
              <div className={`-mt-1 ${state?.heloc ? "line-through" : null}`}>
                HELOC payment <span className="text-xs">$1000</span>
              </div>
            </div>
            <div className="flex flex-row gap-3">
              <Checkbox
                size="sm"
                color="dark"
                checked={state.travel}
                onChange={() => (!state?.travel ? handleCheck("travel") : null)}
              />
              <div className={`-mt-1 ${state?.travel ? "line-through" : null}`}>
                Travel fund <span className="text-xs">$250</span>
              </div>
            </div>
            <div className="flex flex-row gap-3">
              <Checkbox
                size="sm"
                color="dark"
                checked={state.maint}
                onChange={() => (!state?.maint ? handleCheck("maint") : null)}
              />
              <div className={`-mt-1 ${state?.maint ? "line-through" : null}`}>
                Maintenance <span className="text-xs">$500</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
