var express = require('express');
var router = express.Router();
child = require('child_process').execFile('ffmpeg', [
    '-i', 'rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov', '-qscale', '2', '-r', '23', '-b:v', '2048k', '-crf', '50', '-s', '640x480', '-f', 'mpjpeg', 'pipe:'
]);
child.unref();
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
let a='';

child.stdout.on('data', function(data) {
a=data;
});
router.get('/srcimg', function(req, res, next) {
    res.header('Accept-Ranges','bytes');
    res.header('Connection:keep-alive');
    res.header('Content-type', 'multipart/x-mixed-replace;boundary=ffserver');
    res.end(a);
});
module.exports = router;
