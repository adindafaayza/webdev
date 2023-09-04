const bird = document.getElementById("bird");
const tree = document.getElementById("tree");
const plane = document.getElementById("plane");
const playerScore = document.getElementById("score");

let score = 0;
let interval = null;

let scorePoint = () => {
    score++
    playerScore.innerHTML = `Score : ${score}`
}


function float(){
    if (bird.classList != "float") {
        bird.classList.add("float");

        setTimeout(function () {
            bird.classList.remove("float");
        }, 300);
    }
    let score = 0
    interval = setInterval(scorePoint, 100)
}

function flydown(){
    if (bird.classList != "flydown") {
        bird.classList.add("flydown");

        setTimeout(function () {
            bird.classList.remove("flydown");
        }, 300);
    }
    let score = 0
    interval = setInterval(scorePoint, 100)
}

let isAlive = setInterval(function () {
    // get current bird Y position
    let birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
    
    // get current tree X position
    let treeLeft = parseInt(window.getComputedStyle(tree).getPropertyValue("left"));

    // get current plane X position
    let planeLeft = parseInt(window.getComputedStyle(plane).getPropertyValue("left"));
    
    // detect collision
    if ((treeLeft < 50 && treeLeft > 0 && birdTop >= 100)||(planeLeft < 50 && planeLeft > 0 && birdTop <= 100)) {
        //collision
        if(confirm("Game Over! Retry?")){
            window.location.reload();
        }
    }
}, 10)

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp" || event.key === " ") {
        float();
    } else if (event.key === "ArrowDown") {
        flydown();
    }
})