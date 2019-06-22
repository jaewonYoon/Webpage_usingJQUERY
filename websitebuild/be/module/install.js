module.exports = function(app) {
  var express = require("express");
  var path = require("path");
  //connect path to module/jquery to use jquery in fe views
  app.use(
    "/js",
    express.static(path.join(__dirname, "../../../node_modules/jquery/dist"))
  );
  //bootstrap css install
};
