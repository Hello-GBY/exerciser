var path = require("path");
var express = require("express");
var router = express.Router();
var baseUrl = path.resolve("./图片库");
console.log("baseUrl: ", baseUrl);
const fs = require("fs-extra");
let f = "/name1/头像2.jpeg";

router.get("/getExercises", function (req, res, next) {
  // todo: 随机读取文件夹（获取文件夹个数来随机最大值）
  // todo: 随机读取里面的图片（通过目录下为图片的数量）

  res.send({
    code: 200,
    data: {
      Option: ["物理", "生物", "英语"],
      answer: "物理",
      picturePath: f,
    },
  });
});

router.get("/getPicture", function (req, res, next) {
  // todo: 返回图片
  console.log("f: ", f);
  res.sendFile(baseUrl + f);
});

module.exports = router;
