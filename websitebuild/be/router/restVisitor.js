mongoose = require("mongoose");
//visitorSchema build with mongoose
const visitorSchema = {
  day: Number,
  count: Number
};
//collection named 'visitcounts'
const Visitor = mongoose.model("Visitor", visitorSchema);

module.exports = function(app) {
  //Let's build REST API
  //when client get request on visitors route
  app
    .route("/visitors")
    .get(function(req, res) {
      Visitor.find(function(err, foundVisitor) {
        if (!err) {
          res.send(foundVisitor);
        } else {
          res.send(err);
        }
      });
    })
    .post(function(req, res) {
      console.log(req.body.day);
      console.log(req.body.count);
      const newVisitor = new Visitor({
        day: req.body.day,
        count: req.body.count
      });
      newVisitor.save(function(err) {
        if (!err) {
          res.send(err);
        } else {
          res.send("new Visitor's data successfully saved");
        }
      });
    })
    .delete(function(req, res) {
      Visitor.deleteMany(function(err) {
        if (!err) {
          res.send("Successfully deleted all Visitors");
        } else {
          res.send(err);
        }
      });
    });
};
