const {Band} = require("./classes");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
const knex = require("knex")({
    client: "pg",
    connection: {
        host: process.env.RDS_HOSTNAME || "localhost",
        user: process.env.RDS_USERNAME || "postgres",
        password: process.env.RDS_PASSWORD || "SuperUser123",
        database: process.env.RDS_DB_NAME || "nepal",
        port: process.env.RDS_PORT || 5432,
        ssl: process.env.DB_SSL ? {rejectUnauthorized: false} : false
    }
})

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname + "/index.html"));
// });

app.get("/", (req, res) => {
    knex.select().from("event").then(event => {
        res.render("displayEvent", {myevent: event})
    })
})

app.get("/addEvent", (req, res) => {
    res.render("addEvent")
})

app.post("/addEvent", (req, res) =>{
    knex("event").insert({
        // don't have to do id bc it auto-increments in postgresql/pgAdmin
        EventName: req.body.EventName.toUpperCase(),
        EventDescription: req.body.EventDescription.toUpperCase(),
        StartDate: req.body.StartDate,
        StartTime: req.body.StartTime,
        EndDate: req.body.EndDate,
        EndTime: req.body.EndTime
    }).then(myevent => {
        res.redirect("/")
    })
})

app.post("/deleteEvent/:id", (req, res) => {
    knex("event").where("EventID", req.params.id).delete().then(myevent => {
        res.redirect("/")
    }).catch(err => {
        console.log(err);
        res.status(500).json([err])
    })
})

app.get("/editEvent/:id", (req, res) => {
    knex.select("EventID",
                "EventName",
                "EventDescription",
                "StartDate",
                "StartTime",
                "EndDate",
                "EndTime").from("event").where("EventID", req.params.id).then(event => {
        res.render("editEvent", {myevent: event})
    }).catch(err => {
        console.log(err);
        res.status(500).json({err})
    })
})

app.post("/editEvent", (req, res) =>{
    knex("event").where("EventID", parseInt(req.body.EventID)).update({
        EventName: req.body.EventName.toUpperCase(),
        EventDescription: req.body.EventDescription.toUpperCase(),
        StartDate: req.body.StartDate,
        StartTime: req.body.StartTime,
        EndDate: req.body.EndDate,
        EndTime: req.body.EndTime
    }).then(myevent => {
        res.redirect("/")
    })
})

app.get("/displayBand", (req, res) => {
    let bands = new Array()

    bands.push(new Band("Queen", "Bohemian Rhapsody", "Freddie Mercury"));
    bands.push(new Band("Aerosmith", "Dream On", "Steven Tyler"));
    bands.push(new Band("Nirvana", "Smells Like Teen Spirit", "Kurt Cobain"));
    bands.push(new Band("AC/DC", "Back in Black", "Brian Johnson"));
    bands.push(new Band("Journey", "Don't Stop Believin'", "Steve Perry"));
    
    res.render("displayBands", {bands : bands});
});

app.get("/displayBands", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/displayMusic", (req, res) => {
    res.sendFile(path.join(__dirname + "/musicInput.html"));
});

app.post("/storeMusic", (req, res) => {
    let sOutput = "";

    sOutput = "Bands Name: " + req.body.bandName + "<br><br>Favorite Song: " + req.body.favSong +
    "<br><br>Music Genre: " + req.body.musicGenre;

    res.send(sOutput);
});

app.listen(port, () => console.log("Website has started listening..."));