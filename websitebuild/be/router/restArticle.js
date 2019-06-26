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
          console.log("error occurs");
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

/////Requests Targetting A Specific Article /////
module.exports = function(app) {
  app
    .route("/articles/:articleTitle")

    .get(function(req, res) {
      //Use the found result.
      Article.findOne({ title: req.params.articleTitle }, function(
        err,
        foundArticle
      ) {
        if (err) {
          res.send(err);
        }
        if (foundArticle) {
          res.send(foundArticle);
        } else {
          res.send("No articles found in Articles");
        }
      });
    })

    .put(function(req, res) {
      console.log("put method is acdtivated");
      Article.update(
        { title: req.params.articleTitle },
        { title: req.body.title, content: req.body.content },
        function(err) {
          if (!err) {
            res.send("Successfully updated!");
          } else {
            res.send(err);
          }
        }
      );
    });
};
