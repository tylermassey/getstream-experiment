const jsonBody = require("body/json");
const stream = require("getstream");

import config from "./config";

module.exports = (req, res) => {
  const sendMessage = (err, payload) => {
    if (err) {
      res.end("error");
    } else {
      const client = stream.connect(
        config.appKey,
        config.appSecret,
        config.appId
      );
      client
        .user(payload.id)
        .create(payload.body)
        .then(() => res.end(`User [${payload.id}] successfully created!`))
        .catch(reason => {
          res.end(reason.message);
        });
    }
  };

  if (req.method === "POST") {
    jsonBody(req, res, sendMessage);
  } else {
    res.end("send a message!");
  }
};
