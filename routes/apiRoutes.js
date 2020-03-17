const fs = require("fs")
const path = require("path")
let notesData;

module.exports = function (app) {

    fs.readFile("db.json", "utf", function(err, data){
        if (err) throw err;
        notesData = JSON.parse(data)
    })

    app.get("/api/notes", function(req, res) {
        res.JSON(notesData)
        console.log(notesData)
      });

    app.post("/api/notes", function(req, res) {
        let newNotes = req.body 
        notesData.push(newNotes)
        let parsedData = JSON.stringify(notesData)
        fs.writeFile(path.join("db.json"), parsedData, (err) =>{
            if (err) throw err

        })
        res.json(notesData)
    })

}