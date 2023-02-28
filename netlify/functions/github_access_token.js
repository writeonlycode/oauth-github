import axios from "axios";

exports.handler = async function (event, context) {
  const code = event.queryStringParameters.code;
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  if (code) {
    const response = await axios.post(
      `https://github.com/login/oauth/access_token`,
      null,
      {
        params: {
          code,
          client_id,
          client_secret,
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ response }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ event, context }),
  };
};
