import axios from "axios";

export async function handler(event, context) {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const data = {
    consumer_key: `${process.env.POCKET_CONSUMER_KEY}`,
    access_token: `${process.env.POCKET_ACCESS_TOKEN}`,
  };

  try {
    const pocket = await axios.post(
      "https://getpocket.com/v3/get",
      data,
      config
    );
    console.log(pocket);
    const result = JSON.stringify(pocket.data);
    console.log(result);
    return {
      statusCode: 200,
      body: result,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      body: JSON.stringify(err.message),
    };
  }
}
