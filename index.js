const startButton = document.getElementById('start-button');
const camera = document.getElementById("camera-holder");
const elevatorDoor = document.getElementById('sliding-door');
const plank = document.getElementById('plank');
const elevatorDing = document.getElementById('elevator-ding');
let hasDied = false;
let teleportToAfterLife = false;

function openElevator() {
    document.querySelector("#sliding-door").emit("open", true);
    //elevatorDing.sound.playSound();
}

function slideToPlank() {
    camera.emit("walk-plank");
}

function breakPlank() {
    plank.emit("break");
}

function fallToDeath() {
    teleportToAfterLife = true;
    camera.emit("fall");
}

startButton.addEventListener('click', openElevator);

elevatorDoor.addEventListener('animationend', function () {
    slideToPlank();
    //elevatorDing.play();
    console.log('animation ended');
});

camera.addEventListener('animationend', function() {
    console.log("camera detected animation end");
    if(!hasDied) {
        breakPlank();
        // wait 3 seconds until you fall
        setTimeout(function(){
            fallToDeath();
        }, 2500);
        hasDied = true;
    }
    if (teleportToAfterLife){
        console.log("Teleport");
        window.location.href = "dungeon.html";
    }
});
