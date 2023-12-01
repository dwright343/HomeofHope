const express = require("express"); // 

let app = express(); // creates object (express website)

let path = require("path"); // imports path module to make it easier to find files

const port = process.env.PORT || 3000; // "process.env.PORT" tells node.js when it is starting to look for environment variable (set up in op system or linux op system if deployed) that is called PORT to specify which port the application should run on. If there is no port it will use 3000.

//app.set("view engine", "ejs"); // could use pug. ejs is more popular. for insertion of data straight into html

app.use(express.urlencoded({extended: true})); // parse data out of objects. pulling data out of forms.

// const knex = require("knex")({ // connection to the database in a variable called knex. 
//     client: "pg", 
//     connection: {
//         host: process.env.RDS_HOSTNAME || "localhost", //put whatever aws says
//         user: process.env.RDS_USERNAME || "postgres", //put whatever aws says
//         password: process.env.RDS_PASSWORD || "SuperUser123",
//         database: process.env.DB_NAME || "nepal",
//         port: process.env.RDS_PORT || 5432 //put whatever aws says
//     }
// })

// this kind of code (app.get and app.post) has to go here almost at the end
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/LandingPage/index.html"));
});


// app.get("/", (req, res) => {
//     knex.select().from("country").then( country => {
//         res.render("displayCountry", { mycountry : country}); // res.render method from express. now we're using files with .ejs extension instead of files with .html extension. "mycountry" is key/parameter. "country" is a list of all records returned from the select statement.
//     })
// })

// app.post("/", (req, res) => {
//     knex.select().from("country").then( country => {
//         res.render("displayCountry", { mycountry : country}); // res.render method from express. now we're using files with .ejs extension instead of files with .html extension. "mycountry" is key/parameter. "country" is a list of all records returned from the select statement.
//     })
// })

app.listen(port, () => console.log("Website has started listening")); //  starts listening. always last line in this type of file.

// for app.get or app.post
// if its a post - use id. uses req.body.attribute
// if its a get - use name. uses req.query.attribute

// get in the habit of making the id="" and the name="" the same. when you make a radio button, you use the name as the group and the id as the unique tag. everything else the id and name should be identical.
// when using post you have to reference the name because it's a group.

// take all the bootstrap and change the file extensions of all of them to .ejs.