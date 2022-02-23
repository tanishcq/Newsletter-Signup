const express = require("express")
const bodyParser = require("body-parser")
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/signup.html"); 
})

app.post("/", (req, res) => {
    var firstname = req.body.firstName;
    var lastname = req.body.lastName;
    var email = req.body.email;

    console.log(firstname, lastname, email);
})

app.listen(3000, ()=>{
    console.log("server live at 3000");
})