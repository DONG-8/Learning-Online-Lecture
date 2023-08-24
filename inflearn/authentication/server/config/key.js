if (process.env.NODE_ENV === "productino") {
  module.exports = require("./prod.js");
} else {
  module.exports = require("./dev.js");
}
