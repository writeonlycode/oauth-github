import axios from "axios";

exports.handler = async function (event, context) {
  const code = event.queryStringParameters.code;
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  console.log(`Received request with code: ${code}`);

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
      body: JSON.stringify(response.data),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      error: "bad_verification_code",
      error_description: "The code passed is incorrect or expired.",
      error_uri:
        "/apps/managing-oauth-apps/troubleshooting-oauth-app-access-token-request-errors/#bad-verification-code",
    }),
  };
};
