var express = require('express');
var app = express();
const path = require("path")
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get("/", (req, res) => {
    res.render("index");
})
var io = require('socket.io', {
    transports: [
        'websocket'
        , 'flashsocket'
        , 'htmlfile'
        , 'xhr-polling'
        , 'jsonp-polling'
    ]
}).listen(app.listen(9090));

var input=
"rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov",
    loop = undefined;

var util = require('util'),
    exec = require('child_process').exec;
for(i=0;i<30;i++) {
    (function f() {
        callFFmpeg(input);
        function callFFmpeg(input) {
            let
                rate = 25, //
                extraparams = '-b:v 32k',
                suffixout = 'camaraip',
                outextension = 'jpg';
            exec('ffmpeg -i ' + input + ' -r ' + rate + ' ' + extraparams + ' -f image2 -updatefirst 1 ' + __dirname + "/" + '001'+i + '_' + suffixout + '.' + outextension, {maxBuffer: 2048 * 1024},
                function (error, stdout, stderr) {
                    if (error !== null) {
                        console.error(error);
                    }
                });
        }



    })()
}
callFFmpeg(input);
function callFFmpeg(input) {
    let
        rate = 25, //
        extraparams = '-b:v 32k',
        suffixout = 'camaraip',
        outextension = 'jpg';
    exec('ffmpeg -i ' + input + ' -r ' + rate + ' ' + extraparams + ' -f image2 -updatefirst 1 ' + __dirname + "/" + '001' + '_' + suffixout + '.' + outextension, {maxBuffer: 2048 * 1024},
        function (error, stdout, stderr) {
            if (error !== null) {
                console.error(error);
            }
        });
}

callSocket('001');
const fs = require("fs");
function callSocket(cam) {
    io.on('connection', function (client) {
        setInterval(function () {
            fs.readFile(__dirname + "/" + cam + '_' + "camaraip" + '.' + "jpg",
                function (err, content) {

                    if (!content || content.toString('base64') < 10)
                        return
                    client.emit('message', {
                        data: content.toString('base64')
                    });

                });
        }, 1000 / 25);
    });
}