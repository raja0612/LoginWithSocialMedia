const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: true }));

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const GITHUB__ACCESS_TOKEN_URL = process.env.GITHUB__ACCESS_TOKEN_URL;
const PORT = 8080;

/*
The below method will be called after successful
authentication,

this redicrect url is configured in git hub oauth app
http://localhost:8080/oauth/redirect

*/

app.get("/oauth/redirect", (req, res) => {
    axios({
      method: "POST",
      url: `${GITHUB__ACCESS_TOKEN_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
      headers: {
        Accept: "application/json",
      },
    }).then((response) => {
        console.log(response);
        res.redirect(
        `http://localhost:3000?access_token=${response.data.access_token}`
      );
    });
  });
  

  app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
  });