var path = require("path");
var express = require("express");
var router = express.Router();
const baseUrl = path.resolve("./题库");
const fs = require("fs-extra");
var f = "";
const baseH = "http://127.0.0.1:9008/img";
router.get("/getExercises", function (req, res, next) {
  // 随机读取文件夹（获取文件夹个数来随机最大值）
  var dd = "";
  var dirs = [];
  var dirName = "";
  function r() {
    let dirLength = fs.readdirSync(baseUrl);
    dirs = dirLength.filter((dir) => {
      var stat = fs.lstatSync(baseUrl + "/" + dir);
      var is_direc = stat.isDirectory(); // true || false 判断是不是文件夹
      if (is_direc) {
        return dir;
      }
      return false;
    });
    dirName = dirs[random(dirs.length - 1)];
    // 随机读取里面的图片（通过目录下为图片的数量）
    let pics = fs.readdirSync(baseUrl + "/" + dirName);
    let picName = pics[random(pics.length - 1)];
    dd = "/" + dirName + "/" + picName;
  }
  r();
  // 与上一次一致
  if (dd && f == dd) {
    r();
  }
  f = dd;
  res.send({
    // Option: dirs,
    answer: dirName,
    picturePath: baseH + f,
  });
});

router.get("/getPicture", function (req, res, next) {
  // todo: 返回图片
  res.sendFile(baseUrl + f);
});
function random(num) {
  return Math.round(Math.random() * num);
}
module.exports = router;
