const axios = require("axios");
const queryString = require("querystring");

module.exports = function getUserInfo(code) {
  const CLIENT_ID = "761687121756160010";
  const CLIENT_SECRET = "zb41svnf-reF1ukore45jFyR__R6NyY9";
  const scope = "identify%20email";
  const REDIRECT_URI = "http://127.0.0.1:5000/login";
  const discordLoginURL = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=http%3A%2F%2F127.0.0.1%3A5000%2Flogin&response_type=code&scope=${scope}`;
  const discordAPIURL = "https://discord.com/api/users/@me";
  const tokenURL = "https://discord.com/api/oauth2/token";

  axios
    .post(
      tokenURL,
      queryString.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
        scope: "identify email connections",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((token) => {
      //and print the result
      finalData = token;

      axios
        .get(discordAPIURL, {
          headers: {
            Authorization: `Bearer ${token.data.access_token}`,
          },
        })
        .then((userData) => {
          console.log(userData.data);
          return userData.data;
        })
        .catch((error) => {
          console.warn(error);
        });
    })
    .catch((error) => {
      console.warn(error);
    });
};
