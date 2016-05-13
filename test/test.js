// Print all of the news items on Hacker News
var jsdom = require("jsdom");
var fs = require("fs");
// var jquery = fs.readFileSync("./node_modules/jquery/dist/jquery.js", "utf-8");

// jsdom.env({
//   url: "http://news.ycombinator.com/",
//   src: [jquery],
//   done: function (err, window) {
//     var $ = window.$;
//     console.log("HN Links");
//     $("td.title:not(:last) a").each(function () {
//       console.log(" -", $(this).text());
//     });
//   }
// });

var scripts = ['../../libraries.js', '../../build/dash.js'];

jsdom.env('<dash-button></dash-button>', scripts, (error, window) => {
  console.log(error);
  console.log(window.document.querySelector('dash-button'));
});
