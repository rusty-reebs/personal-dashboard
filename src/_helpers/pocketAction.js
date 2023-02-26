import axios from "axios";

const consumer_key = `${import.meta.env.VITE_POCKET_CONSUMER_KEY}`;
const access_token = `${import.meta.env.VITE_POCKET_ACCESS_TOKEN}`;

export async function pocketAction(action, id) {
  const config = {
    // method: "POST",
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
    access_token: access_token,
    consumer_key: consumer_key,
  };

  try {
    const pocket = await axios.post(
      "https://getpocket.com/v3/send",
      data,
      config
    );
    console.log("👉 pocket", pocket);
  } catch (err) {
    console.log(err);
  }
}
