import axios from "axios";

export async function handler(event, context) {
  const action = event.queryStringParameters.action;
  const id = event.queryStringParameters.id;

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const data = {
    actions: [
      {
        action: action,
        item_id: id,
      },
    ],
    consumer_key: `${process.env.POCKET_CONSUMER_KEY}`,
    access_token: `${process.env.POCKET_ACCESS_TOKEN}`,
  };

  try {
    const pocket = await axios.post(
      "https://getpocket.com/v3/send",
      data,
      config
    );
    return {
      statusCode: 200,
      body: JSON.stringify(pocket.data),
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
