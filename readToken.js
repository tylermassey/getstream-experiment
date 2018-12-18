const jsonBody = require("body/json");
const stream = require("getstream");

import config from "./config";

module.exports = (req, res) => {
  try {
    const client = stream.connect(
      config.appKey,
      config.appSecret,
      config.appId
    );
    const readToken = client.feed("user", "innovaUser").token;
    res.end(readToken);
  } catch (e) {
    res.end("send a message!");
  }
};
