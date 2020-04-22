const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")


module.exports = function (app) {

    app.get("/api/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"))
      });

    app.post("/api/notes", function(req, res) {
        let newNotes = req.body 
        let newId = uniqid()
        newNotes.id = newId

        fs.readFile("./db/db.json",  function(err, data){
          if (err) throw err;
        let notesData = JSON.parse(data)
        notesData.push(newNotes)

        fs.writeFile("./db/db.json", JSON.stringify(notesData), "utf8", err =>{
          if (err) throw err
        })

      })
        res.redirect("/notes")
        })
        
    app.delete("/api/notes/:id", function(req, res) {
        let choice = req.params.id
        let db = fs.readFileSync(path.join(__dirname,"./db/db.json"))
        let dbData = JSON.parse(db)
      
        for (let i = 0; i < dbData.length; i++) {
          if (dbData[i].id.toString() === choice) {
            dbData.splice(i, 1)
            break
          }
        }
        fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(dbData))

        res.sendStatus(200)
      }) 
}