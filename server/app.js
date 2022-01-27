var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var modelRouter = require("./routes/model");

app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

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

// 请求图片接口
app.use("/api", modelRouter);

// 请求选项接口

const server = app.listen(9008, function () {
  console.log("程序启动啦！！！");
  console.log("复制下面访问连接");
  console.log("http://127.0.0.1:9008");
});
