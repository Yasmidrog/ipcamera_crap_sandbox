const app = require('express')(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    rtsp = require('./rtsff');
server.listen(6147);
var uri = 'rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov',
    stream = new rtsp.FFMpeg({input: uri});
io.on('connection', function(socket) {
    var pipeStream = function(data) {
        socket.emit('data', data.toString('base64'));
    };
    stream.on('data', pipeStream);
    socket.on('disconnect', function() {
        stream.removeListener('data', pipeStream);
    });
});
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});