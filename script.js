const msgEl = document.getElementById("msg")

const randomNum = getRandomNum();

console.log(randomNum);


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

let recognition = new window.SpeechRecognition;



//  start speech recogtion and game
recognition.start();

//  capture speak user
function onSpeak(e) {
    const msg = e.results[0][0].transcript



    writeMessage(msg);
    checkNumber(msg)

}

//wwrite what user speak

function writeMessage(msg) {
    msgEl.innerHTML = `
    <div> you said :<div/>
    <span class="box">${msg}<span/>
    `;
}

// chech msg Against number
function checkNumber(msg) {
    const num = Number(msg);

    // check the msg is number
    if (Number.isNaN(num)) {
        msgEl.innerHTML += ` <div>That is not a valid number</div>`;
        return
    }
    //    check in range
    if (num > 100 || num < 1) {
        msgEl.innerHTML = `<div>Number should be must in 1 - 100</div>`;
        return
    }



    // check number 
    if (num === randomNum) {
        document.body.innerHTML = `<h2>Congrate ! you have guessed the number ! <br /><br />
        It was ${num}</h2>
        <button class="play-again" id="play-again"> Play Again</button>
        `
    } else if (num > randomNum) {
        msgEl.innerHTML += `<div>GO LOWER</div>`;
    } else {
        msgEl.innerHTML += `<div>GO HIGHER</div>`;
    }

}


// generate a random number
function getRandomNum() {
    return Math.floor(Math.random() * 100) + 1
}


// result speak
recognition.addEventListener("result", onSpeak);

// End SR service

recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener('click', e => {
    if (e.target.id === 'play-again') {
        window.location.reload();
    }
})