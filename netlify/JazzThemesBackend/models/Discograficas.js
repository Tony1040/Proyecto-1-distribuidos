const fs = require('fs')
const file_location = "/../data/discografica.json"

module.exports = class Discograficas{
    constructor(){
        this.readPublishers()
    }
    readPublishers(){
        fs.readFile(__dirname + file_location, 'utf8', (err, data) => {
            this.publishers = JSON.parse(data)
        });
    }

    savePublishers(){
        let data = JSON.stringify(this.publishers)
        fs.writeFileSync(__dirname + file_location, data)
    }

    getAll(req, res){
        res.json(this.publishers);
    }

    getById(req, res){
        // Reading id from the URL as string
        const id = parseInt(req.params.id)
        // Searching books for the id
        for (let publisher of this.publishers) {
            if (publisher.id === id) {
                res.json(publisher)
                return
            }
        }
        // Sending 404 when not found something is a good practice
        res.status(404).send('Discografica no encontrada');
    }

    updateById(req, res){
       // Reading id from the URL
        const id = parseInt(req.params.id)
        const thePublisher = req.body

        // Update item to the books array
        for (let i = 0; i < this.publishers.length; i++) {
            let publisher = this.publishers[i]
            if (publisher.id === id) {
                this.publishers[i] = thePublisher
            }
        }
        this.savePublishers()
        res.send('Discografica actualizada');
    }

    newPublisher(req, res){
        const newPublisher = req.body
        // Add item to the books array
        for (let i = 0; i < this.publishers.length; i++) {
            let publisher = this.publishers[i]
            if (publisher.id === newPublisher.id) {
              res.status(404).send('Esta Discografica ya existe');
              return
            }
        }
        this.publishers.push(newPublisher)
        this.savePublishers()
        res.send('Discografica agregada');
    }

    deleteById(req, res, albums){
        const id = parseInt(req.params.id)
        this.publishers = this.publishers.filter(i => {
            if (i.id !== id) {
                return true
            }
            return false
        });
        albums.deleteAlbumsByPublisherId(id)
        this.savePublishers()
        res.send('Discografica eliminada')
    }
}
