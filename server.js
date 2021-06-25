const express = require("express");
const bodyParser = require("body-parser")
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://vaibhav183:Mongodb@vibhu1@cluster0.zksak.mongodb.net/IEEE_DATA", { useNewUrlParser: true, useUnifiedTopology: true });
const ieee_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
var wrongres = "";
var resultvalue = "";
const IEEE_COLLECTION = mongoose.model("IEEE_COLLECTION", ieee_schema);

app.get("/", function(_req, _res) {
    _res.render("login", { wrong: wrongres });

});
app.post("/login", function(req, res) {
    if (req.body.user === "" || req.body.pass === "") {
        wrongres = "First fill the details!!";
        res.render("login", { wrong: wrongres });
    } else {
        IEEE_COLLECTION.find(function(err, items) {
            if (!items) {
                console.log("err");
            } else {
                var flag = false;
                items.forEach(value => {
                    if (req.body.user === value.username && req.body.pass === value.password) {
                        flag = true;
                        res.render("welcome", { name_value: value.name, username: req.body.user });
                    }
                })
                if (flag === false) {
                    wrongres = "Wrong details you entered!!";
                    res.render("login", { wrong: wrongres });
                }
            }
        });

    }
});
app.get("/signupRequest", function(req, res) {
    res.render("signup", { resv: resultvalue });
});
app.post("/signupres", function(req, res) {
    if (req.body.name1 !== "" && req.body.user !== "" && req.body.pass1 !== "" && req.body.pass2 !== "") {
        if (req.body.pass1 === req.body.pass2) {
            let wes = false;
            let ss = req.body.user;
            // IEEE_COLLECTION.find(function(err, docs) {
            //     if (err) return console.log(err);
            //     docs.forEach(items => {
            //         if (items.username === req.body.user) {
            //             wes = true;
            //         }
            //     });
            // });

            // if (wes === true) {
            //     resultvalue = "This username already exist!!";
            //     res.render("signup", { resv: resultvalue });
            // } else {
            const newEntry = new IEEE_COLLECTION({
                name: req.body.name1,
                username: req.body.user,
                password: req.body.pass1
            });
            newEntry.save(function(err, doc) {
                if (err) return console.error(err);
                console.log("Document inserted succussfully!");
            });
            res.render("welcome", { name_value: req.body.name1, username: req.body.user });
            // }
        } else {
            resultvalue = "Possword didn't match! Please try again";
            res.render("signup", { resv: resultvalue });
        }
    } else {
        resultvalue = "Fill all input first!!"
        res.render("signup", { resv: resultvalue });
    }

});
app.listen(process.env.PORT || 3000, function() {
    console.log("Server reached at port 3000");
})