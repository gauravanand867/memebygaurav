module.exports = {
  MONGODB_URL:
    process.env.MONGODB_URL ||
    "mongodb+srv://gaurav:dbcrio@meme.edzyg.mongodb.net/memes?retryWrites=true&w=majority",
  PORT: process.env.PORT || 8080,
};

//For local database
// MONGODB_URL=mongodb://localhost:27017/meme
