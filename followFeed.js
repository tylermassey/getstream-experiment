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
    const innovaUserFeed = client.feed("timeline", "innovaUser");
    innovaUserFeed
      .follow("shipments", "innova")
      .then(() => {
        res.end("Successfully followed");
      })
      .catch(() => {
        res.end("Error following");
      });
  } catch (e) {
    res.end("send a message!");
  }
};
