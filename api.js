// Require the express framework.
const express = require('express');
const api = express();

// This is the templating engine.
api.set('view engine', 'ejs');

// Listen on an open port
const port = process.env.PORT || 3000;
server = api.listen(port);

// Require socket.io
const io = require('socket.io')(server);

// Middleware functions.
api.use(express.static('public'));

// Route handling
api.get('/', (req, res) => {
    res.render('index');
});

// listen on every connection
io.on('connection', (socket) => {
    console.log('New user connected...');

    // Assign default username.
    socket.username = `Anonymous`;
    
    // listen for a change of user_name
    socket.on('change_username', (data) => {
        socket.username = data.username;
    });

    // listen on new_message
    socket.on('new_message', (data) => {
        // broadcast new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    });

    io.on('disconnect', () => {
        console.log('user disconnected');
    });
});

