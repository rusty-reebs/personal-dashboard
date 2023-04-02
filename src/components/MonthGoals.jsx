import { Checkbox, Loader } from "@mantine/core";
import { format } from "date-fns";
import { useEffect, useReducer } from "react";
import { db } from "../firebase/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";

export default function MonthGoals() {
  const today = new Date();
  const month = format(new Date(today), "MMMM");
  const docRef = doc(db, "data", "transactions");

  const initialState = {
    month: "",
    heloc: false,
    travel: false,
    maint: false,
    isLoading: true,
    isError: false,
    errorMessage: "",
  };

  const [state, dispatch] = useReducer(
    (state, action) => ({
      ...state,
      ...action,
    }),
    initialState
  );

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
          dispatch({ ...newMonth });
        } catch (err) {
          console.log(err);
          dispatch({ isError: true, errorMessage: err.toString() });
        }
      } else {
        dispatch({
          heloc: result.heloc,
          travel: result.travel,
          maint: result.maint,
        });
      }
      dispatch({ isLoading: false });
    }
    getData();
  }, []);

  const update = async (payment) => {
    dispatch({ ...state, [payment]: true });
    await updateDoc(docRef, {
      [payment]: true,
    });
  };

  const checkboxStyle = {};

  return (
    <div className="flex flex-col gap-7 mt-auto mb-8">
      <p className="text-lg">{format(new Date(today), "MMMM yyyy")}</p>
      <div className="flex flex-col gap-3">
        {state.isError ? (
          <div className="mx-auto my-auto">⚠️ {state.errorMessage}</div>
        ) : state.isLoading ? (
          <Loader variant="dots" color="#AF0404" className="mx-auto mt-10" />
        ) : (
          <>
            <div className="flex flex-row gap-3">
              <Checkbox
                size="sm"
                color="dark"
                checked={state.heloc}
                onChange={() => (!state?.heloc ? update("heloc") : null)}
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
                onChange={() => (!state?.travel ? update("travel") : null)}
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
                onChange={() => (!state?.maint ? update("maint") : null)}
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
