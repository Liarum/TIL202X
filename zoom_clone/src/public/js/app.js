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

function handleMessageSubmit(event) {
    event.preventDefault();
    const input = room.querySelector("#msg input");
    const msg = input.value;
    socket.emit("new_message", msg, roomName, () => {
        addMessge(`You : ${msg}`);
    });
    input.value = "";
}

function handleNicknameSubmit(event) {
    event.preventDefault();
    const input = room.querySelector("#name input");
    const nickname = input.value;
    socket.emit("nickname", nickname);
}

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;

    const msgForm = room.querySelector("#msg");
    const nameForm = room.querySelector("#name");

    msgForm.addEventListener("submit", handleMessageSubmit);
    nameForm.addEventListener("submit", handleNicknameSubmit);
    
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


socket.on("welcome", (user) => {
    addMessge(`${user} joined!`);
});

socket.on("bye", (left) => {
    addMessge(`${left} left..`);
})

socket.on("new_message", addMessge);