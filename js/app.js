const level = document.querySelectorAll(".level>button");
const gameBoard = document.querySelector('.gameBoard');
const timer = document.querySelector('.timer');
const reset = document.querySelector('.reset');

let mine = [];
let timerSed = 0;
let sec = 0;
let stoptime = true;
let firstClick = true;

const startTimer = () => {
    if (stoptime == true) {
        stoptime = false;
        timerCycle();
    };
};

const resetTimer = () => {
    stoptime = true;
    timer.innerHTML = '0';
};

const timerCycle = () => {
    if (stoptime == false ) {
        sec = sec + 1;
        timer.innerHTML = sec;
        let timerSetTime = setTimeout("timerCycle()", 1000);
        if(stoptime){
            sec = 0
            clearInterval(timerSetTime);
        }
    };
};

const mineMaker = (level) => {
    mine = [];
    firstClick = true;
    for (let i = 0; i < level; i++) {
        mine.push([]);
        for (let j = 0; j < level; j++) {
            const isMine = Math.floor(Math.random() * 2 + 1);

            mine[i].push(isMine === 1 ? 1 : 0);
        };
    };
};

const levelChange = () => {
    gameBoard.innerHTML = '';
    mine.forEach((e, idx) => {
        e.forEach(() => {
            gameBoard.innerHTML += `
                    <div class="tile" data-num>
                        <p class></p>
                    </div>`;
        });
    });
};


const listener = (e) => {
    switch (e.target.innerText) {
        case "easy":
            gameBoard.style.gridTemplateColumns = "repeat(10, 1fr)";
            mineMaker(10);
            levelChange();
            console.log(mine);
            break;
        case "normal":

            mineMaker(15);
            levelChange();
            gameBoard.style.gridTemplateColumns = "repeat(15, 1fr)";
            break;
        case "hard":

            mineMaker(20);
            levelChange();
            gameBoard.style.gridTemplateColumns = "repeat(20, 1fr)";
            break;

    };
};

reset.addEventListener('click', resetTimer);

level.forEach((levels) => {
    levels.addEventListener("click", listener);
});

gameBoard.addEventListener('click', (e) => {
    if (firstClick) {
        startTimer();
        firstClick = false;
    };
    e.target.classList.add('click');
});

gameBoard.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.target.classList.toggle('flag');
});








// const evt = new App()
// class App{
//     constructor(){
//         this.easy 
//         const level = document.querySelectorAll('.level>button');
//         // this.level = level
//         this.addEvent();
//     };

//      addEvent(){
//          this.level.addEventListener('click', () => {
//              console.log(1);
//          })
//          console.log(this.level);
//      }
// }
// level.addEventListener('click', (e) => {
// console.log(e);
// })