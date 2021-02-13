const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const dotenv = require("dotenv");

//Importing Router
const memeRoute = require("./routers/memeRoute");

dotenv.config();
const app = express();

const mongodbUrl = config.MONGODB_URL;
const PORT = config.PORT;

//Connecting to Database
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => console.log(error.reason));

app.use(bodyParser.json());
app.use(memeRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Meme House");
});

//PORT for running server
app.listen(PORT, () => {
  console.log(`Backend Server started on port ${PORT}`);
});
