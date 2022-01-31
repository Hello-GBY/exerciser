var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var modelRouter = require("./routes/model");
var path = require("path");
const figlet = require("figlet");
const chalk = require("chalk");

app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.get("/", function (req, res, next) {
  return res.sendFile(path.resolve("./index.html"));
}); // 根目录 校验授权

// 访问白名单
let witeList = ["http://127.0.0.1:8080"];

// 手动设置允许跨域
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // let origin = req.headers.origin;
  // if (witeList.includes(origin)) {
  //   res.header("Access-Control-Allow-Origin", origin);
  // }
  next();
});
app.use("/img", express.static("题库")); // web下其他文件作为静态目录返回
app.use("/css", express.static("css")); // web下其他文件作为静态目录返回
app.use("/js", express.static("js")); // web下其他文件作为静态目录返回

// 请求图片接口
app.use("/api", modelRouter);

// 请求选项接口

const server = app.listen(9008, function () {
  figlet(
    "wht",
    {
      // font: 'Small Shadow',
      horizontalLayout: "fitted",
      // verticalLayout: 'default',
      // width: 90,
      whitespaceBreak: true,
    },
    function (err, data) {
      if (err) {
        console.log("专项练习程序启动失败，请联系作者！");
        return;
      }
      // logo
      console.log(chalk.blue(data));
      console.log("专项练习程序 v1.1 启动成功！ ");
      console.log();
      console.log("复制下面连接，在浏览器中访问");
      console.log(chalk.blue("http://127.0.0.1:9008"));
    }
  );
});
