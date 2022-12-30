import axios from "axios";

exports.handler = async function (event, context) {
  const headers = {
    headers: {
      apikey: `${process.env.VITE_CURRENCY_API_KEY}`,
      "Access-Control-Allow-Origin": "*",
    },
  };

  //fetch
  const cad = await axios(
    "http://api.apilayer.com/exchangerates_data/convert?to=cad&from=usd&amount=1",
    headers
  );
  // const btc = await axios(
  //   "http://api.apilayer.com/exchangerates_data/convert?to=usd&from=btc&amount=1",
  //   headers
  // );

  const data = {
    date: new Date(cad.data.info.timestamp * 1000),
    cad: cad.data.result,
  };
  //return fetched data
  return {
    statusCode: 200,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
};
