const mongoose = require("mongoose");
//Schema for meme
const MemeSchema = new mongoose.Schema({
  name: {
    type: "string",
  },
  caption: {
    type: "string",
  },
  url: {
    type: "string",
  },
});
MemeSchema.set("timestamps", true);

module.exports = mongoose.model("meme", MemeSchema);
