const jsonBody = require("body/json");
const stream = require("getstream");

import config from "./config";

module.exports = (req, res) => {
  try {
    const client = stream.connect(
      config.appKey,
      config.appSecret,
      config.appId,
      "us-east"
    );
    const userToken = client.createUserToken("innovaUser");
    res.end(userToken);
  } catch (e) {
    res.end("send a message!");
  }
};
