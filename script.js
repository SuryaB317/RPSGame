roundsSelect = document.querySelector("#roundsSelect");
roundsSelectContainer = document.querySelector("#roundsSelectContainer");
errorMessagePara = document.querySelector("#errorMessagePara");

popup = document.querySelector("#popup");
closeButton = document.querySelector("#closeButton");

playButton = document.querySelector("#playButton");
nextRoundButton = document.querySelector("#nextRoundButton");
initButton = document.querySelector("#initButton");

gameControls = document.querySelectorAll(".gameControls");
userControls = document.querySelectorAll(".userControls");
computerControls = document.querySelectorAll(".computerControls");

roundID = document.querySelector("#roundID");
roundsSpan = roundID.querySelector("span");

countDown = document.querySelector("#countDown");

userScore = document.querySelector("#userScore");
userFireWork = document.querySelector("#userFireWork");

computerScore = document.querySelector("#computerScore");
computerFireWork = document.querySelector("#computerFireWork");


isGameStarted = false;
currentRound = undefined;
numberOfRounds = undefined;
isGameKeyEnables = false;


// For Popup

function openPopup() {
    //popup.classList.remove('hidden');
    removeClasses([popup], ["hidden"])

}
function closePopup() {
    // popup.classList.add('hidden');
    addClasses([popup], ["hidden"])
}

function addClasses(elements, classes) {
    elements.forEach((elements) => {
        classes.forEach((className) => {
            elements.classList.add(className);
        })
    })
}

function removeClasses(elements, classes) {
    elements.forEach((elements) => {
        classes.forEach((className) => {
            elements.classList.remove(className);
        })
    })
}

function hide(elements, delay) {
   setTimeout(()=>{
    elements.forEach((element) => {
        element.classList.add('hidden');
    });
   },delay)
}

function show(elements) {
    elements.forEach((element) => {
        element.classList.remove('hidden');
    });
}
//GamePlay Starts at Initial stage


init();
setKeyIpDownEvent();

function init() {
    isGameStarted = false;
    userScore.innerText = "0";
    computerScore.innerText = "0";

    roundsSelect.value = 5;

    hide([countDown, roundID, initButton, nextRoundButton]);
    show([roundsSelectContainer, playButton]);
}

function startGame() {
    if (roundsSelect.value === '') {
        displayError("Select valid rounds!!")
        return
    }
    numberOfRounds = +roundsSelect.value; //for str to number convention +..
    isGameStarted = true;

    hide([roundsSelectContainer, playButton]);
    show([roundID, countDown]);

    currentRound = 1;
    countDown.innerText = "4";
    triggerCountDown();
}

function nextRound(){
    hide([nextRoundButton]);
    show([countDown]);
    countDown.innerText = "4";
    triggerCountDown();
}


//For countdown
function triggerCountDown() {
    countDown.innerText = +countDown.innerText - 1;
    if (+countDown.innerText > 1) {
        setTimeout(() => {
            triggerCountDown();
        }, 1000);
    }
    else{
        countDown.innerText = "Start!"
    }
        removeClasses([countDown],["animate-[bounce_1s_ease-in-out_infinite]"]);
        enable(gameControls);
        isGameKeyEnables = true;
        
    
}

function select(userInput){
    showSelection(userControls[userInput-1]);

    let computerInput = Math.floor(Math.random()*3)+1;

    showSelection(computerControls[computerInput-1]);

    console.log({userInput , computerInput});

    setTimeout(()=>{
        disable(gameControls);
        isGameKeyEnables = false;
    },500);

    if(userInput === computerInput){
        countDown.innerText = "Draw";
    }
    else if((userInput === 1 && computerInput === 3) ||
    (userInput === 2 && computerInput === 1) ||
    (userInput === 3 && computerInput === 2)
    ){
        // countDown.innerText="win";
        userScore.innerText = +userScore.innerText +1;
        show([userFireWork]);
       hide([userFireWork],1600);
    }
    else{

        // countDown.innerText="lpse";
        computerScore.innerText = +computerScore.innerText +1;
        show([computerFireWork]);
       hide([computerFireWork],1600);
    }
    if(currentRound < numberOfRounds){
    prepareforNextRound();
    }
    else{
        gameOver();
        show([initButton]);
    }
}
function gameOver(){

    const userScoreValue= this.userScore.innerText;
        const computerScoreValue = this.computerScore.innerText;

        if(userScoreValue === computerScoreValue){
            countDown.innerText = "Game Over, It was a Draw";
        }
        
        else if(userScoreValue > computerScoreValue){
            countDown.innerText = "Game Over, You Win";
        }
        else{
            countDown.innerText = "Game Over, Computer Win";
        }
      
}

// for Rounds
function prepareforNextRound(){
   
        setTimeout(()=>{
            currentRound++;
            roundsSpan.innerText = currentRound;
            show([nextRoundButton])
        },1000)
}


//enable btns

function enable(elements){
elements.forEach((element)=>{
    element.disabled =false;
})
}
function disable(elements){
    elements.forEach((element)=>{
        element.disabled =true;
    })
}


//For Error Messages
function displayError(message) {
    errorMessagePara.innerText = message;
    setTimeout(() => {
        errorMessagePara.innerText = '';
    }, 1500);
}

function showSelection(control){
addClasses([control],["bg-green-200", "border-green-600", "shadow-lg"]);

setTimeout(()=>{
    removeClasses([control],["bg-green-200", "border-green-600", "shadow-lg"]);
},500);
}


//For keyBorad Actions

function setKeyIpDownEvent(){
    document.onkeydown = (event)=>{
     if(event.key === 'Tab'){
        event.preventDefault();
     }
     else if(event.key === 'Escape'){
        closePopup();
     }
     else if(event.key.toLowerCase() === 'r' &&  isGameKeyEnables){
        select(1);
     }
     else if(event.key.toLowerCase() === 'p' &&  isGameKeyEnables){
        select(2);
     }
     else if(event.key.toLowerCase() === 's' &&  isGameKeyEnables){
        select(3);
     }
     else if(event.key === ' '){
        if(!playButton.classList.contains('hidden')){
            startGame();
        }
        else if(!nextRoundButton.classList.contains('hidden')){
            nextRound();
        }
        else if(!initButton.classList.contains('hidden')){
            initButton();
        }
     }
    }
}