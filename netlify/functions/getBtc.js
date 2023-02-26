import axios from "axios";

export async function handler(event, context) {
  const headers = {
    headers: {
      apikey: `${process.env.VITE_CURRENCY_API_KEY}`,
      "Access-Control-Allow-Origin": "*",
    },
  };

  const btc = await axios(
    "http://api.apilayer.com/exchangerates_data/convert?to=usd&from=btc&amount=1",
    headers
  );

  const data = {
    btc: btc.data.result,
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
