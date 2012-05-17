var app = require('express').createServer();
var io = require('socket.io').listen(app);

//cloud9 requires this
app.listen(process.env.C9_PORT);

//send default index
app.get('/', function (req, res)
{
     res.sendfile(__dirname + "/index.html");
});

//allow access to client.js file
app.get('/client.js', function (req, res)
{
     res.sendfile(__dirname + "/client.js");
});

//this happens whenever we get a new player
io.sockets.on('connection', function(socket)
{
    socket.emit('m', 'Welcome to the MPGameTut Chat Service');
    socket.on('m', function(data)
    {
        socket.broadcast.emit('m', data);
    });
});