const express = require("express");
const router = express.Router();

//Importing Schema for meme
const Meme = require("../models/memeModel");

//POST route for storing meme to database
router.post("/memes", async (req, res) => {
  const meme = new Meme({
    name: req.body.name,
    caption: req.body.caption,
    url: req.body.url,
  });
  const newMeme = await meme.save();
  if (newMeme) {
    res.send({
      _id: newMeme.id,
    });
  } else {
    res.status(401).send({ message: "Invalid Data" });
  }
});

//GET route for fetching 100 memes from database
router.get("/memes", async (req, res) => {
  //Sorting in reverse chronological order i.e. last created one first on the basis of createdAt
  const memHundred = await Meme.find().sort({ createdAt: -1 }).limit(100);
  if (memHundred.length > 0) {
    return res.status(200).send(memHundred);
  }
  return res.status(404).send(memHundred);
});

//GET route for finding meme by id of meme
router.get("/memes/:id", async (req, res) => {
  const memeId = req.params.id;
  const memeOne = await Meme.findOne({
    _id: memeId,
  });
  if (memeOne) {
    return res.status(200).send(memeOne);
  }
  return res.status(404).send({ message: "Meme not found" });
});

//Updating memes
router.patch("/memes/:id", async (req, res) => {
  const memeUpdateId = req.params.id;
  const memeUpdate = await Meme.findOne({
    _id: memeUpdateId,
  });
  if (memeUpdate) {
    memeUpdate.caption = req.body.caption;
    memeUpdate.url = req.body.url;
    const memeUpdated = await memeUpdate.save();
    if (memeUpdated) {
      return res.status(200).send({ message: "Meme Updated successfully" });
    } else {
      return res.status(500).send({ message: "Error in updating" });
    }
  } else {
    return res.status(404).send({ message: "Product Not found" });
  }
});

//Router for deleting meme

router.delete("/memes/:id", async (req, res) => {
  const memeDelete = await Meme.findById(req.params.id);
  if (memeDelete) {
    await memeDelete.remove();
    res.send({ message: "Meme deleted successfully" });
  } else {
    res.send("Error in Deleting");
  }
});

module.exports = router;
