const express = require("express");
const app = express();

app.use(express.json());

app.post("/albumart", (req, res) => {
  const { artist, album } = req.body;
  searchForArtistAlbum(artist, album, "Large")
    .then((imageUrl) => {
      res.json({ imageUrl });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

albumArt = require("album-art");

function searchForArtistAlbum(artist, album, size) {
  return albumArt(artist, { album, size })
    .then((imageUrl) => {
      console.log(
        `Image URL for artist ${artist} and album ${album}: ${imageUrl}`
      );
      return imageUrl; // This is the image URL for the album
    })
    .catch((error) => {
      console.error("An error occurred while fetching album artwork:", error);
      throw error; // Rethrowing the error for further handling
    });
}
