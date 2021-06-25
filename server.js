const express = require("express");
const bodyParser = require("body-parser")
const ejs = require("ejs");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function(_req, _res) {
    _res.sendFile(__dirname + "/login.html");

});
app.post("/", function(req, res) {
    res.render("welcome", { username: req.body.user });
});
app.get("/signupRequest", function(_req, res) {
    res.sendFile(__dirname + "/signup.html")
});
app.listen(process.env.PORT || 3000, function() {
    console.log("Server reached at port 3000");
})