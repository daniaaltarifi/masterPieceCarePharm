const mongoose = require("mongoose");
const schema = mongoose.Schema;
const newsDataModel = new schema(
  {
    title: {
      type: String,
    },
  
    summary: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);
const newsModel = mongoose.model("News", newsDataModel);
module.exports = newsModel;
