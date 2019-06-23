mongoose = require("mongoose");
//article Schema build with mongoose
const articleSchema = {
  title: String,
  content: String
};
//articles 라는 이름의 컬렉션이 위에서 만든 스키마로 만들어진다.
const Article = mongoose.model("Article", articleSchema);

module.exports = function(app) {
  //Let's build REST API
  //when client get request on articles route
  app
    .route("/articles")
    .get(function(req, res) {
      Article.find(function(err, foundArticles) {
        if (!err) {
          res.send(foundArticles);
        } else {
          res.send(err);
        }
      });
    })
    .post(function(req, res) {
      console.log(req.body.title);
      console.log(req.body.content);
      //create new model
      const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
      });
      newArticle.save(function(err) {
        if (!err) {
          res.send("Successfully added a new article.");
        } else {
          res.send(err);
        }
      });
    })
    .delete(function(req, res) {
      Article.deleteMany(function(err) {
        if (!err) {
          res.send("Successfully deleted all articles.");
        } else {
          res.send(err);
        }
      });
    });
};
