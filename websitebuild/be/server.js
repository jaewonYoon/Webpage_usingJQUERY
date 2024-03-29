var express = require("express");
var path = require("path");
var app = express();
mongoose = require("mongoose");
//bodyParser. 정확히 왜 사용하는지 잘 모르겠다.
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
//서버를 실행시켰을때 어디폴더를 기준으로 뷰페이지를 실행시킬 것인가 설정한다.
app.set("views", path.join(__dirname, "../fe", "views"));
//view engine으로 템플릿엔진인 ejs를 사용하겠다고 선언한다.
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

//nodejs와 데이터베이스 설정 아이디와 비밀번호가 있다면 id:password@url:port
mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true
});

//현 디렉토리 밑에 있는 public에서 css 파일을 참조한다.
//view 파일(html, ejs)에서 ref="style.css"라고 하면 public폴더 아래있는 style.css를 참조함
//cdn을 사용하지 않을 경우 필수
app.use(express.static(path.join(__dirname, "../fe/views", "public")));
// redirect JS jQuery
var modules = require("./module/install")(app);
//define each urls
var router = require("./router/main")(app);
//rest api
var restArticle = require("./router/restArticle")(app);
var restVisitor = require("./router/restVisitor")(app);
app.listen(3000, function(err, res) {
  if (!err) console.log("Express server has started on port 3000");
  else {
    console.log("Server crashed");
    res.redirect("/");
  }
});
