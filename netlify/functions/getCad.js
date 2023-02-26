import axios from "axios";

export async function handler(event, context) {
  const headers = {
    headers: {
      apikey: `${process.env.VITE_CURRENCY_API_KEY}`,
      "Access-Control-Allow-Origin": "*",
    },
  };

  const cad = await axios(
    "http://api.apilayer.com/exchangerates_data/convert?to=cad&from=usd&amount=1",
    headers
  );

  const data = {
    date: new Date(cad.data.info.timestamp * 1000),
    cad: cad.data.result,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
}
