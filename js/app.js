const level = document.querySelectorAll(".level>button");
const gameBoard = document.querySelector('.gameBoard');
const timer = document.querySelector('.timer');
const reset = document.querySelector('.reset');
const gameOver = document.querySelector('.gameOver');

let gameBoardArr;
let mineArr;
let gameLevel;
let timerSec = 0;
let stoptime = true;
let firstClick = true;
let count;
let countArr = [];
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
    gameBoardArr = [];
    firstClick = true;
    for (let i = 0; i < level; i++) {
        gameBoardArr.push([]);
        for (let j = 0; j < level; j++) {
            gameBoardArr[i].push(1);
        };
    };
};

const mineArrMaker = () => {
    mineArr = [];
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
        gameBoardArr[e[0]][e[1]] = 'e';
    });
};

const gameBoardMaker = () => {
    gameBoard.innerHTML = '';
    gameBoardArr.forEach((e, y) => {
        e.forEach((el, x) => {
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
    gameOver.style.display = 'none';
    gameBoard.style.gridTemplateColumns = `repeat(${levelChangeNum()}, 1fr)`;
    gameBoard.style.pointerEvents = 'auto';
    reset.style.pointerEvents = 'auto';

    resetTimer();
    gameArrMaker(levelChangeNum());
    mineArrMaker();
    gameBoardMaker();
};

const boomMine = () => {
    gameBoard.childNodes.forEach(e => {
        if (e.childNodes[1].classList.contains('txt_mine')) {
            e.childNodes[1].classList.remove('non-click');
        };
    });
    stoptime = true;
    // gameBoard.style.pointerEvents = 'none';
    // gameOver.style.display = 'flex';
};


const countNum = () => {
    countArr.forEach(e => gameBoardArr[e[0]][e[1]] === 'e' ? count++ : count);
    countArr = [];
};

const cornerCheck = (ty, tx) => {
    let mineLen = levelChangeNum() - 1;
    if(ty === 0 && tx === 0){
        // [0][0] 
        countArr = [...countArr,[ty,tx + 1],[ty + 1,tx + 1], [ty + 1,tx]];
        countNum();
        }else if(ty === 0 && tx === mineLen ){
            // [0][9]
            countArr = [...countArr,[ty, tx - 1], [ty + 1,tx - 1], [ty + 1,tx] ];
            countNum();
        }else if(ty === mineLen && tx === 0 ){
            // [9][0]
            countArr = [...countArr,[ty - 1, tx], [ty - 1, tx + 1], [ty, tx + 1]];
            countNum();
        }else if(tx === mineLen && ty === mineLen ){
            //[9][9]
            countArr = [...countArr,[ty - 1, tx], [ty - 1, tx -1], [ty, tx -1] ];
            countNum();
        }else{
            return true;
        };
};

const 상하죄우나머지처리 = (ty, tx) => {
    let mineLen = levelChangeNum() - 1;
    if(cornerCheck(ty, tx)){
        if(ty === 0 ){
            countArr = [...countArr,[ty, tx - 1], [ty, tx + 1], [ty + 1, tx], [ty + 1, tx - 1], [ty + 1, tx + 1] ];
            countNum();
        }else if(ty === mineLen ){
            // 하[9][tx]
            countArr = [...countArr, [ty, tx - 1], [ty, tx + 1], [ty - 1, tx], [ty - 1, tx - 1], [ty - 1, tx + 1] ];
            countNum();
        }else if(tx === 0  && ty !== mineLen && ty !== 0){
            //좌[ty][0]
            countArr = [...countArr, [ty, tx + 1], [ty + 1, tx + 1], [ty - 1, tx], [ty - 1, tx + 1], [ty + 1, tx] ];
            countNum();
        }else if(tx === mineLen && ty != mineLen && ty != 0){
            //우[ty][마지막 수]
            countArr = [...countArr, [ty, tx - 1], [ty - 1, tx], [ty + 1, tx - 1], [ty + 1, tx], [ty - 1, tx - 1] ];
            countNum();
        }else{
            //나머지
            countArr = [...countArr, [ty, tx - 1], [ty, tx + 1], [ty - 1, tx], [ty + 1, tx], [ty - 1, tx - 1], [ty + 1, tx - 1], [ty - 1, tx + 1], [ty + 1, tx + 1]];
            countNum();
        };
    };
}

const countListener = (target) => {
    count = 0
    
    let tx = parseInt(target.dataset.x); 
    let ty = parseInt(target.dataset.y);
    if(!target.childNodes[1].classList.contains('click')){
        상하죄우나머지처리(ty, tx)
        let result = count == 0 ? '' : count;
        target.childNodes[1].innerText = result;
        target.childNodes[1].classList.add(`txt${count}`);
        if(target.childNodes[1].classList.contains('txt0')){
            
            영터지기(ty, tx)
        }
    }else{
        // 클릭된애처리();
    }
};

// const 클릭된애처리 = () => {

// }

//일단 0인거 배열에 넣어주고 거기다가 
const 영터지기 = (ty, tx) => {
    let mineABC = []
    mineABC = [...mineABC, [ty, tx - 1], [ty, tx + 1], [ty - 1, tx], [ty + 1, tx], [ty - 1, tx - 1], [ty + 1, tx - 1], [ty - 1, tx + 1], [ty + 1, tx + 1]];
    let mineNe = []
    let mineNe2 = []
    
    mineABC.forEach(el => {
        let y = el[0]
        let x = el[1]
        if(gameBoardArr[y][x] === 1){
            let tile = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
            tile.classList.add('click');
            mineNe = [...mineNe, [y, x - 1], [y, x + 1], [y - 1, x], [y + 1, x], [y - 1, x - 1], [y + 1, x - 1], [y - 1, x + 1], [y + 1, x + 1]]
        }
        mineABC = [];
    });    
    // mineNe.forEach(el => {
    //     let y = el[0]
    //     let x = el[1]
    //     if(gameBoardArr[y][x] === 1){
    //         let tile = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    //         tile.classList.add('click');
    //         mineNe2 = [...mineNe2, [y, x - 1], [y, x + 1], [y - 1, x], [y + 1, x], [y - 1, x - 1], [y + 1, x - 1], [y - 1, x + 1], [y + 1, x + 1]]
    //     }
    //     mineABC = [];
    // });   
    // mineNe2.forEach(el => {
    //     let y = el[0]
    //     let x = el[1]
    //     if(gameBoardArr[y][x] === 1){
    //         let tile = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    //         tile.classList.add('click');
    //         mineNe2 = [...mineNe2, [y, x - 1], [y, x + 1], [y - 1, x], [y + 1, x], [y - 1, x - 1], [y + 1, x - 1], [y - 1, x + 1], [y + 1, x + 1]]
    //     }
    //     mineABC = [];
    // }); 
    
};

const gameClickListener = ({ target }) => {
    if(target.classList.contains('tile')){
        target.classList.add("click");
        if (firstClick) {
            firstClick = false;
            startTimer();   
        };
           target.childNodes[1].classList.contains('txt_mine') ? boomMine() : countListener(target);
    };
};

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

//0인부분에서 +1씩
// 연속파괴
// 첫클릭 지뢰x
// 깃발 갯수는 지뢰 개수만큼
// 클린된거에 깃발 x
// 터질시
// 지뢰 찾아진곳은 빨간

