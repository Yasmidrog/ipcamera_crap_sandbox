 <?php Header('Accept-Ranges:bytes');
    Header('Connection:keep-alive');
    Header('Content-type: multipart/x-mixed-replace;boundary=ffserver');
    passthru('ffmpeg -i "rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov" -qscale 2 -r 23 -b:v 2048k -crf 50 -s 640x480 -f mpjpeg pipe:');