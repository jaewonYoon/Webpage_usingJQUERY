module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("home.ejs");
  });

  app.get("/test", function(req, res) {
    res.render("test.ejs");
  });

  app.get("/boot", function(req, res) {
    res.render("boot.ejs");
  });
};
