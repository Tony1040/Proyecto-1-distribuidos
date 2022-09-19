const fs = require('fs')
const file_location = "/../data/artista.json"

module.exports = class Artistas{
    constructor(){
        this.readArtists()
    }
    readArtists(){
        fs.readFile(__dirname + file_location, 'utf8', (err, data) => {
            this.artists = JSON.parse(data)
        });
    }

    saveArtists(){
        let data = JSON.stringify(this.artists)
        fs.writeFileSync(__dirname + file_location, data)
    }

    getAllAuthors(req, res){
        res.json(this.artists);
    }

    getArtistById(req, res){
        // Reading id from the URL as string
        const id = parseInt(req.params.id)
        // Searching books for the id
        for (let artist of this.artists) {
            if (artist.id === id) {
                res.json(artist)
                return
            }
        }
        // Sending 404 when not found something is a good practice
        res.status(404).send('Artist not found');
    }

    updateArtistById(req, res){
       // Reading id from the URL
        const id = parseInt(req.params.id)
        const theArtist = req.body

        // Update item to the books array
        for (let i = 0; i < this.artists.length; i++) {
            let artist = this.artists[i]
            if (artist.id === id) {
                this.artists[i] = theArtist
            }
        }
        this.saveArtists()
        res.json(theArtist);
    }

    newArtist(req, res){
        const newArtist = req.body
        // Add item to the books array
        for (let artist of this.artists) {
            if (artist.id === newArtist.id) {
              res.status(404).send('Artist already exits');
              return
            }
        }
        this.artists.push(newArtist)
        this.saveArtists()
        res.send('Artist was added');
    }

    deleteArtistById(req, res, albums){
        const id = parseInt(req.params.id)
        this.artists = this.artists.filter(i => {
            if (i.id !== id) {
                return true
            }
            return false
        });
        albums.deleteAlbumsByArtistId(id)
        this.saveArtists()
        res.send('Artist was deleted')
    }
}
