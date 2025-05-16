document.addEventListener("DOMContentLoaded", () => {
    let input = document.getElementById("editor");
    input.addEventListener("keydown", write);
});

function write(){
    
    document.getElementById("text").innerHTML=(new Date()).getMilliseconds();
}


function removeLive(){
    let input = document.getElementById("editor");
    input.removeEventListener("keydown", write);
}

function addLive(){
    let input = document.getElementById("editor");
    input.removeEventListener("keydown", write);
    input.addEventListener("keydown", write);
}