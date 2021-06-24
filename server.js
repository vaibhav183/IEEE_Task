const express = require("express");
const bodyParser = require("body-parser")
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function(_req, _res) {
    _res.sendFile(__dirname + "/login.html");

});
app.post("/", function(req, res) {
    console.log(req.body);
    res.send("<h1>Hello " + req.body.user + "<br>Your Password is " + req.body.pass + "</h1>");
});
app.get("/signupRequest", function(_req, res) {
    res.sendFile(__dirname + "/signup.html")
});
app.listen(process.env.PORT || 3000, function() {
    console.log("Server reached at port 3000");
})