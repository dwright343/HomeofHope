const express = require("express");

let app = express(); //creates object (express website)

let path = require("path");

const port = process.env.PORT || 3000; // "process.env.PORT" tells node.js when it is starting to look for environment variable (set up in op system or linux op system if deployed) that is called PORT to specify which port the application should run on. If there is no port it will use 3000.

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

app.listen(port, () => console.log("Website has started listening"))