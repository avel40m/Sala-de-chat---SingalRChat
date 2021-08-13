"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Desactiva el boton de envio hasta que se establezca la conexion
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function(user, message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    //Se crea listado de mensaje
    li.textContent = `Mensaje de ${user}: ${message}`;
});

connection.start().then(function() {
    document.getElementById("sendButton").disabled = false;
}).catch(function(err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function(event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function(err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});