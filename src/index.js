const express = require('express')
const Albums = require("../netlify/JazzThemesBackend/models/Albums.js");
const Artists = require("../netlify/JazzThemesBackend/models/Artistas.js");
const Publishers = require("../netlify/JazzThemesBackend/models/Discograficas.js");


const albums = new Albums()
const artists = new Artists();
const publishers = new Publishers();


const app = express()
app.use(express.json())
const port = process.env.PORT || 1337

// Albums
app.get("/album", (req, res) => albums.getAllAlbums(req, res))
app.get("/album/:id", (req, res) => albums.getAlbumById(req, res))
app.put("/album", (req, res) => albums.newAlbum(req, res))
app.post("/album/:id", (req, res) => albums.updateAlbumById(req, res))
app.delete("/album/:id", (req, res) => albums.deleteAlbumById(req, res))

// Artists
app.get("/artista", (req, res) => artists.getAllAuthors(req, res))
app.get("/artista/:id", (req, res) => artists.getArtistById(req, res))
app.get("/artista/:id/album", (req, res) => albums.getAlbumsByArtistId(req, res))
app.put("/artista", (req, res) => artists.newArtist(req, res))
app.post("/artista/:id", (req, res) => artists.updateArtistById(req, res))
app.delete("/artista/:id", (req, res) => artists.deleteArtistById(req, res, albums))

// Publishers
app.get("/discografica", (req, res) => publishers.getAll(req, res))
app.get("/discografica/:id", (req, res) => publishers.getById(req, res))
app.get("/discografica/:id/album", (req, res) => albums.getAlbumsByPublisherId(req, res))
app.put("/discografica", (req, res) => publishers.newPublisher(req, res))
app.post("/discografica/:id", (req, res) => publishers.updateById(req, res))
app.delete("/discografica/:id", (req, res) => publishers.deleteById(req, res, albums))


app.listen(port, () => 
  console.log(`Server listening on port ${port}`)
)