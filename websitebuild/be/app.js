var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.render("home");
});

app.listen(3000, function() {
  console.log("Express server has started on port 3000");
});
