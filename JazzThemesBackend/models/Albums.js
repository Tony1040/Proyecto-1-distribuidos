const fs = require('fs')
const file_location = "/../data/album.json"

module.exports = class Albums{
    constructor(){
        this.readAlbums()
    }
    readAlbums(){
        console.log(__dirname + file_location)
        fs.readFile(__dirname + file_location, 'utf8', (err, data) => {
            this.albums = JSON.parse(data)
        });
    }

    saveAlbums(){
        let data = JSON.stringify(this.albums)
        fs.writeFileSync(__dirname + file_location, data)
    }

    getAllAlbums(req, res){
        res.json(this.albums);
    }

    getAlbumsByArtistId(req, res){
        const albums = []
        const artist_id = parseInt(req.params.id)
        // Searching books for the id
        for (let album of this.albums) {
            if (album.id_artista === artist_id) {
                albums.push(album)
            }
        }
        res.json(albums)
    }

    getAlbumsByPublisherId(req, res){
        const albums = []
        const publisher_id = parseInt(req.params.id)
        // Searching books for the id
        for (let album of this.albums) {
            if (album.id_discografica === publisher_id) {
                albums.push(album)
            }
        }
        res.json(albums)
    }

    getAlbumById(req, res){
        // Reading id from the URL as string
        const id = parseInt(req.params.id)
        // Searching books for the id
        for (let book of this.albums) {
            if (book.id === id) {
                res.json(book)
                return
            }
        }
        // Sending 404 when not found something is a good practice
        res.status(404).send('Album not found');
    }

    updateAlbumById(req, res){
       // Reading id from the URL
        const id = parseInt(req.params.id)
        const theAlbum = req.body

        // Update item to the books array
        for (let i = 0; i < this.albums.length; i++) {
            let album = this.albums[i]
            if (album.id === id) {
                this.albums[i] = theAlbum
            }
        }
        this.saveAlbums()
        res.send('Album was updated');
    }

    newAlbum(req, res){
        const newAlbum = req.body
        // Add item to the books array
        for (let i = 0; i < this.albums.length; i++) {
            let album = this.albums[i]
            if (album.id === newAlbum.id) {
              res.status(404).send('Album already exits');
              return
            }
        }
        this.albums.push(newAlbum)
        this.saveAlbums()
        res.send('Book was added');
    }

    deleteAlbumById(req, res){
        const id = parseInt(req.params.id)
        this.albums = this.albums.filter(i => {
            if (i.id !== id) {
                return true
            }
            return false
        });
        this.saveAlbums()
        res.send('Album was deleted')
    }
    
    deleteAlbumsByPublisherId(publisher_id){
        this.albums = this.albums.filter(i => {
            if (i.id_discografica !== publisher_id) {
                return true
            }
            return false
        });
        this.saveAlbums()
    }

    deleteAlbumsByArtistId(artist_id){
        this.albums = this.albums.filter(i => {
            if (i.id_autor !== artist_id) {
                return true
            }
            return false
        });
        this.saveAlbums()
    }
}
