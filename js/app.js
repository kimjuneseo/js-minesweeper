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
    if (stoptime) {
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
        timerSec++;
        timer.innerHTML = timerSec;
        let timerSetTime = setTimeout("timerCycle()", 1000);
        if (stoptime) {
            clearInterval(timerSetTime);
            timerSec = 0;
        }
    };
};

const gameArrMaker = level => {
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
        mineArr.forEach(e => {
            if (JSON.stringify(e) === `[${x},${y}]`) {
                i--;
            };
        });
        mineArr.push([x, y]);
    };
    mineArr.forEach((e) => {
        mine[e[0]][e[1]] = 'e';
    });
};

const gameBoardMaker = () => {
    gameBoard.innerHTML = '';
    mine.forEach((e, x) => {
        e.forEach((el, y) => {
            el === 'e' ?
                gameBoard.innerHTML +=
                `<div class="tile" data-x='${x}' data-y='${y}'>
                <p class="txt_mine non-click"><img src="images/mine.svg" alt="지뢰"></p>
            </div>` :
                gameBoard.innerHTML += `<div class="tile" data-x='${x}' data-y='${y}'>
            <p class></p>
            </div>`;
        });
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

const mineFinder = () => {

}

const boomMine = () => {
    gameBoard.childNodes.forEach(e => {
        if (e.childNodes[1].classList.contains('txt_mine')) {
            e.childNodes[1].classList.remove('non-click');
        };
    });
    stoptime = true;
   
}

const normalBlocks = (target) => {
    let tx = parseInt(target.dataset.x);
    let ty = parseInt(target.dataset.y);
    let count = 0;
        if(ty === 0){
            if (mine[tx][ty + 1]  == 'e'){ count++ }
            if (mine[tx + 1][ty]  == 'e'){ count++ }
            if (mine[tx + 1][ty + 1]  == 'e'){ count++ }
        }else if(ty === levelChangeNum() - 1){
            if (mine[tx][ty - 1]  == 'e'){ count++ }
            if (mine[tx + 1][ty]  == 'e'){ count++ }
            if (mine[tx + 1][ty - 1]  == 'e'){ count++ }
        }else if(tx === 0){
            if (mine[tx][ty - 1]  == 'e'){ count++ }
            if (mine[tx][ty + 1]  == 'e'){ count++ }
            if (mine[tx + 1][ty]  == 'e'){ count++ }
            if (mine[tx + 1][ty - 1]  == 'e'){ count++ }
            if (mine[tx + 1][ty + 1]  == 'e'){ count++ }
        }else if(tx === levelChangeNum() - 1){
            if (mine[tx][ty - 1]  == 'e'){ count++ }
            if (mine[tx][ty + 1]  == 'e'){ count++ }
            if (mine[tx - 1][ty]  == 'e'){ count++ }
            if (mine[tx - 1][ty - 1]  == 'e'){ count++ }
            if (mine[tx - 1][ty + 1]  == 'e'){ count++ }
        } else if(tx === 0 && ty === 0){
            if (mine[tx][ty + 1]  == 'e'){ count++ }
            if (mine[tx + 1][ty]  == 'e'){ count++ }
            if (mine[tx + 1][ty + 1]  == 'e'){ count++ }
        } else if(tx === 0 && ty === levelChangeNum() -1  ){
            if (mine[tx][ty - 1]  == 'e'){ count++ }
            if (mine[tx - 1][ty - 1]  == 'e'){ count++ }
            if (mine[tx - 1][ty]  == 'e'){ count++ }
        } else if(tx === levelChangeNum() -1 && tx === 0){
            if (mine[tx][ty + 1]  == 'e'){ count++ }
            if (mine[tx - 1][ty + 1]  == 'e'){ count++ }
            if (mine[tx - 1][ty]  == 'e'){ count++ }
        } else if(tx === levelChangeNum() -1 && ty === levelChangeNum() -1){
            if (mine[tx][ty - 1]  == 'e'){ count++ }
            if (mine[tx - 1][ty]  == 'e'){ count++ }
            if (mine[tx - 1][ty -1]  == 'e'){ count++ }

        }
        else{
            if (mine[tx][ty - 1]  == 'e'){ count++ }
            if (mine[tx][ty + 1]  == 'e'){ count++ }
            if (mine[tx - 1][ty]  == 'e'){ count++ }
            if (mine[tx + 1][ty]  == 'e'){ count++ }
            if (mine[tx - 1][ty - 1]  == 'e'){ count++ }
            if (mine[tx + 1][ty - 1]  == 'e'){ count++ }
            if (mine[tx - 1][ty + 1]  == 'e'){ count++ }
            if (mine[tx + 1][ty + 1]  == 'e'){ count++ }
        }
        let result = count == 0 ? '' : count 
        target.childNodes[1].innerText = result;

};




// if (mine[tx][ty - 1]  == 'e'){ count++ }
// if (mine[tx][ty + 1]  == 'e'){ count++ }
// if (mine[tx - 1][ty]  == 'e'){ count++ }
// if (mine[tx + 1][ty]  == 'e'){ count++ }
// if (mine[tx - 1][ty - 1]  == 'e'){ count++ }
// if (mine[tx + 1][ty - 1]  == 'e'){ count++ }
// if (mine[tx - 1][ty + 1]  == 'e'){ count++ }
// if (mine[tx + 1][ty + 1]  == 'e'){ count++ }

const normalChainBlocks = () => {

}

const gameClickListener = ({ target }) => {
    target.classList.add("click");
    if (firstClick) {
        firstClick = false;
        startTimer();   
    };
    target.childNodes[1].classList.contains('txt_mine') ? boomMine() : normalBlocks(target);
}

reset.addEventListener("click",() => frameMaker());

level.forEach(levels => {
    levels.addEventListener("click", e => {
        gameLevel = e.target.innerText;
        frameMaker();
    });
});

gameBoard.addEventListener("click", (e) => gameClickListener(e) );

gameBoard.addEventListener('contextmenu', (e) => {
    if (firstClick) {
        startTimer();
        firstClick = false;
    };
    e.preventDefault();
    e.target.classList.toggle('flag');
});

//밑에서 2개 예외처리 && NaN나오는거 고치기