



var MjpegProxy = require('mjpeg-proxy').MjpegProxy;
var express = require('express');
var app = express();

var HTTP_PORT = 8080;

var cam1 = "http://195.67.26.73/mjpg/video.mjpg";
var cam2 ="http://c-cam.uchicago.edu/mjpg/video.mjpg ";

app.set("view options", {layout: false});
app.use(express.static(__dirname + '/public'));

app.get('/index1.jpg', new MjpegProxy('http://c-cam.uchicago.edu/mjpg/video.mjpg ').proxyRequest);

app.listen(HTTP_PORT);

console.log("Listening on port " + HTTP_PORT);