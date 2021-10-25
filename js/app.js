const level = document.querySelectorAll(".level>button");
const gameBoard = document.querySelector('.gameBoard');
const timer = document.querySelector('.timer');
const reset = document.querySelector('.reset');

let mine;
let mineArr;
let gameLevel;
let timerSec = 0;
let stoptime = true;
let firstClick = true;
const levelChangeNum = () => {
    if (gameLevel === 'easy') return 10;
    if (gameLevel === 'normal') return 15;
    if (gameLevel === 'hard') return 20;
};
const mineNumMaker = () => {
    if (gameLevel === 'easy') return 15;
    if (gameLevel === 'normal') return 30;
    if (gameLevel === 'hard') return 80;
};

const startTimer = () => {
    if (stoptime == true) {
        stoptime = false;
        timerCycle();
    };
};

const resetTimer = () => {
    stoptime = true;
    timer.innerHTML = '0';
    timerSec = 0;
};

const timerCycle = () => {
    if (stoptime == false) {
        timerSec = timerSec + 1;
        timer.innerHTML = timerSec;
        let timerSetTime = setTimeout("timerCycle()", 1000);
        if (stoptime) {
            timerSec = 0;
            clearInterval(timerSetTime);
        }
    };
};

const gameArrMaker = (level) => {
    mine = [];
    firstClick = true;
    for (let i = 0; i < level; i++) {
        mine.push([]);
        for (let j = 0; j < level; j++) {
            mine[i].push(1);
        };
    };
};

const mineArrMaker = () => {
    mineArr = []
    for (let i = 0; i < mineNumMaker(); i++) {
        let x = Math.floor(Math.random() * levelChangeNum());
        let y = Math.floor(Math.random() * levelChangeNum());
        mineArr.push([x, y])
    }
    mineArr.forEach((e) => {
        mine[e[0]][e[1]] = 'e';
    })
}

const gameBoardMaker = () => {
    gameBoard.innerHTML = '';
    mine.forEach(e => {
        e.forEach(e => {
            e === 'e' ? 
            gameBoard.innerHTML +=
                `<div class="tile">
                <p class="txt_mine"><img src="images/mine.svg" alt="지뢰"></p>
            </div>` :
            gameBoard.innerHTML += `<div class="tile">
            <p class></p>
            </div>`;
        })
    });
};

const frameMaker = () => {
    gameBoard.style.gridTemplateColumns = `repeat(${levelChangeNum()}, 1fr)`;
    gameBoard.style.pointerEvents = 'auto';
    reset.style.pointerEvents = 'auto';
    
    resetTimer();
    gameArrMaker(levelChangeNum());
    mineArrMaker();
    gameBoardMaker();
};

const gameBoardClick = (e) => {
    
}

reset.addEventListener("click", () => {
    resetTimer();
    frameMaker();
});

level.forEach((levels) => {
    levels.addEventListener("click", e => {
        gameLevel = e.target.innerText;
        frameMaker();
    });
});

gameBoard.addEventListener("click", (e) => {
    if (firstClick) {
        startTimer();
        firstClick = false;
    };
    e.target.classList.add("click");

});

gameBoard.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.target.classList.toggle('flag');
});









