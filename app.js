const express = require("express")
const bodyParser = require("body-parser")
const request = require("request");
const https = require("https");
const { log } = require("console");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/signup.html"); 
})

app.post("/", (req, res) => {
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const email = req.body.email;
    const url = "https://us14.api.mailchimp.com/3.0/lists/2994a0d7e4";

    const options = {
        method: "POST",
        auth: "tanishcq:4885a5ab5092e99b840bfae293846009-us14"
    }

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    
    const request = https.request(url, options, function(response) {
        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        }); 
    });  
    request.write(jsonData);
    request.end();
})

app.post("/failure", (req, res) => {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, () => {
    console.log("server live at 3000");
})

// 4885a5ab5092e99b840bfae293846009-us14

// 2994a0d7e4