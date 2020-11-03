//THANKS TO:
//this github issue: https://github.com/discord/discord-api-docs/issues/1131
//this YT tutorial:  https://www.youtube.com/watch?v=hDsFXI1-EIM

//Dependencies
const express = require("express");
const axios = require("axios");
const queryString = require("querystring");
const dotenv = require('dotenv').config()

//Middleware and MW settings
const app = express();
app.use(express.json());
app.set("json spaces", 4);
const port = process.env.URI || 5000;

//Discord Oauth2 Info
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const scope = "identify%20email";
const discordLoginURL = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=http%3A%2F%2F127.0.0.1%3A5000%2Flogin&response_type=code&scope=${scope}`;
const REDIRECT_URI = "http://127.0.0.1:5000/login";
const discordAPIURL = "https://discord.com/api/users/@me";
const tokenURL = "https://discord.com/api/oauth2/token";

//A GET from root redirects to Discords Oauth2 page
app.get("/", (req, res) => {
  res.redirect(discordLoginURL);
});

//A GET from /login will return a user object
app.get("/login", (req, res) => {
  axios.post(tokenURL, queryString.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: REDIRECT_URI,
        scope: "identify email connections",
      }), {headers: {"Content-Type": "application/x-www-form-urlencoded"}})
    .then((token) => {
      axios.get(discordAPIURL, {headers: {Authorization: `Bearer ${token.data.access_token}`}})
        .then((userData) => {
          console.log(userData.data);
          res.json(userData.data);
        }).catch((error) => {console.warn(error)});
    }).catch((error) => {
      console.warn(error);});
});

//Routes for Dispatchers
app.use("/dispatchers", require("./routes/dispatcherRoutes"));

//APP Baseline Methods
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
