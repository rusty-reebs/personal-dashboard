import { Loader } from "@mantine/core";
import useSWR from "swr";

export default function Currency() {
  const fetcher = () =>
    fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=cad&from=usd&amount=1`,
      {
        mode: "cors",
        headers: {
          apikey: `${import.meta.env.VITE_CURRENCY_API_KEY}`,
        },
      }
    ).then((result) => result.json());

  //   const { data, isLoading } = useSWR(`/currency`, fetcher, {
  //     refreshInterval: 300000,
  //   });

  const isLoading = false;
  const data = { result: "n/a" };

  const response = fetch("/.netlify/functions/getCurrency");
  console.log(response);

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <Loader variant="dots" color="#AF0404" className="mx-auto mb-8" />
      ) : (
        <div>1 USD = {data.result} CAD</div>
      )}
    </div>
  );
}
