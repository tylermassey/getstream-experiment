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

      const innovaShipmentFeed = client.feed("shipments", "innova");
      const activity = {
        actor: "user:ship",
        verb: "post",
        object: payload.message
      };
      innovaShipmentFeed
        .addActivity(activity)
        .then(() => res.end("Message successfully posted"))
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
