  
const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 8080;
let app = express();
let notesDb = require("./db/db.json");


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + "/public"));
// parse to correct file path then throw error if no path found
let dbNotes = JSON.parse(fs.readFileSync("./db/db.json").toString());
console.log(dbNotes);

const updateDb = notesDb => {
    fs.writeFileSync(
        path.join(__dirname, "/db.json"),
        JSON.stringify(notesDb),
        
        )
        // console.log(notesDb);
    };


app.get("/api/notes", (req, res) => {
    return res.json(notesDb);
});


app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    let id = dbNotes.length;
    // console.log(dbNotes);
    newNote.id = id + 1;
    notesDb.push(newNote);
    updateDb(notesDb);
    return res.json(notesDb);
    
});


app.delete("/api/notes/:id",  (req, res) => {
    let id = req.params.id;
    let x = 1;
    delete notesDb[id - 1];
    
    updateDb(notesDb);
    res.send(notesDb);
});




app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


app.listen(PORT, () => {
    console.log("http://localhost:" + PORT);
});

