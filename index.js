const express = require("express");

let app = express(); //creates object (express website)

let path = require("path");

const port = 3000;

app.set("view engine", "ejs"); // could use pug. ejs is more popular. for insertion of data straight into html

app.use(express.urlencoded({extended: true})); // parse data out of objects

const knex = require("knex")({
    client: "pg", 
    connection: {
        host: "localhost",
        user: "postgres",
        password: "SuperUser123",
        database: "",             //not sure yet
        port: 5432
    }
})

app.listen(port, () => console.log("Listening on Port 3000"))