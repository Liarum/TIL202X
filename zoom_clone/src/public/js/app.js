const socket = io();

const welcome = document.getElementById("welcome");

const form = welcome.querySelector("form");


function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");

    // ag1 : event name, ag2 : payload, ag3 : callback function
    socket.emit("enter_room", {payload: input.value}, () => {
        console.log("server is done");
    });

    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);