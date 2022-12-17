import axios from "axios";

exports.handler = async function (event, context) {
  const headers = {
    headers: {
      apikey: `${process.env.VITE_CURRENCY_API_KEY}`,
    },
  };

  //fetch
  const btc = await axios(
    "http://api.apilayer.com/exchangerates_data/convert?to=usd&from=btc&amount=1",
    headers
  );

  console.log(btc.data);

  const data = {
    date: new Date(btc.data.info.timestamp * 1000),
    btc: btc.data.result,
  };
  //return fetched data
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
