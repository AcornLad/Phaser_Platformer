/*
var http = require('http');

http.createServer(function(req, res){
    console.log('Page accessed!');
    res.write('Server started!');
    res.end();
}).listen(3000);
*/
var express = require('express'),
    app = express(),
    http = require('http'),
    httpServer = http.Server(app);

app.use(express.static(__dirname + '/view'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.listen(3000);