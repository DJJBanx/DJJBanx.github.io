const camera = document.getElementById("camera-holder");
const sound = document.getElementById("demon-laugh");
let stage = 0;

function move() {
    console.log("ran move");
    console.log("stage = " + stage);
    switch (stage) {
        case 0:
            console.log("emit move1");
            camera.emit("move1");
            break;
        case 1:
            console.log("emit move2");
            camera.emit("move2");
            break;
        case 2:
            console.log("emit move3");
            sound.components.sound.playSound();
            camera.emit("move3");
            break;
    }
    stage++;
}

console.log("add event listen");
camera.addEventListener("animationend", move);

console.log("set timeout");
setTimeout(move, 8000);
