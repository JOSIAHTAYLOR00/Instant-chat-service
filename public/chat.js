$(function(){
    // make connection
    // let socket = io.connect('http://localhost:3000/');
    let socket = io.connect('https://chatroom-app-00.herokuapp.com');

    // inputs
    let message = $(".message");
    let username = $(".username");
    let send_message = $("#send_message");
    let send_username = $("#send_username");
    let chatroom = $("#chatroom");

    // Emit a message
    send_message.keydown(function(){
        if(event.which === 13){
            socket.emit('new_message', {message : message.val()});
        }
    });



    // listen on new_message
    socket.on("new_message", (data) => {
        console.log(data);
        chatroom.append("<p class='messages'>" + data.username + ": " + data.message + "</p>");
    });

    // Edit a username
    send_username.keydown(function(){
        if(event.which === 13){
            socket.emit('change_username', {username: username.val()});
            console.log(username.val());
        }
    });
});
