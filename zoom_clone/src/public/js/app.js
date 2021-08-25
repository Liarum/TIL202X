const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

const room = document.getElementById("room");

room.hidden = true;

let roomName = "";

function addMessge(message) {
    const ul = room.querySelector("ul");
    const li  = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}


function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
};

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");

    // first arg : event name, args* : payload, last arg : callback function
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);


socket.on("welcome", () => {
    addMessge("Someone joined!");
});