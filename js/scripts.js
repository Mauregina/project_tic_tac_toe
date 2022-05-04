let boxes = document.querySelectorAll('.box')
let x = document.querySelector('.x')
let o = document.querySelector('.o')
let msgContainer = document.querySelector('#message')
let msgText = document.querySelector('#message p')
let btn2Players = document.querySelector('#btn1')
let btnAIPlayer = document.querySelector('#btn2')
let container = document.querySelector('#container')
let scoreContainer = document.querySelector('#score-container')

let secondPlayer = false
let turn = 0
const minMoveHaveWinner = 5 // From this move we check if Minimum move to have a winner
const minPreviusMoveHavePlayer1Winner = 3 // From this move we check if player 1 has a chance to win in the next move and block it
const minPreviusMoveHaveComputerWinner = 4 // From this move we check if player 2 (computer) has a chance to win in the next move and move it
const player1 = 1
const player2 = 2

btn2Players.addEventListener("click", () => {
    prepareGame()
    secondPlayer = true
})

btnAIPlayer.addEventListener("click", () => {
    prepareGame()
    secondPlayer = false
})

function prepareGame() {
    btn2Players.classList.add("hide")
    btnAIPlayer.classList.add("hide")
    container.classList.remove("hide")
    scoreContainer.classList.remove("hide")
}

for(let i=0; i < boxes.length; i++){
    boxes[i].addEventListener("click", () => {

        let alreadyExistElement = boxes[i].childNodes.length > 0

        if (!alreadyExistElement) {
            let newElement = createElement(turn)
            boxes[i].appendChild(newElement) 
            turn++
        }

        let isOver = checkIsOver(turn)

        if ((!secondPlayer) && (!isOver)) {
            let computerMove = getComputerMove()

            // Disable click while setTimeout is not finished
            container.style.pointerEvents = 'none'

            setTimeout(function(){
                container.style.pointerEvents = 'auto'
                let newElement = createElement(turn)
                boxes[computerMove].appendChild(newElement) 
                turn++
                checkIsOver(turn)
            }, 1000)  

        }
    })
}

function getComputerMove() {
    let availableIndexes = []

    boxes.forEach(function callback(value, index){
        if (value.childNodes.length == 0) {
            availableIndexes.push(index)
        } 
    })

    if (turn >= minPreviusMoveHaveComputerWinner) {
        winnerMoveIndex = getWinningCombination(player2, availableIndexes)

        if (winnerMoveIndex) {

            return winnerMoveIndex
        }
    }

    if (turn >= minPreviusMoveHavePlayer1Winner) {
        winnerMoveIndex = getWinningCombination(player1, availableIndexes)

        if (winnerMoveIndex) {
            return winnerMoveIndex
        }
    }        

    return getBetterMoveMinMax(availableIndexes)
}

function getWinningCombination(player, availableIndexes) {
    let [indexesX, indexesO] = getIndexes()
    let indexes

    if (player == 1) {
        indexes = indexesX.slice()   
    } else {
        indexes = indexesO.slice()
    }

    for (let i=0; i < availableIndexes.length; i++) {
        let previousIndexes = indexes.slice()
        previousIndexes.push(availableIndexes[i])

        if (isWinnerCombination(previousIndexes)) {
            return availableIndexes[i]
        }
    }
    return
}

function getBetterMoveMinMax(availableIndexes) {
    return availableIndexes[Math.floor(Math.random()*availableIndexes.length)];
}

function createElement(turn) {
    if (turn%2 == 0) { // its player 1
        let cloneElement = x.cloneNode(true)
        return cloneElement
    } 
    
    let cloneElement = o.cloneNode(true)
    return cloneElement
}

function checkIsOver(turn) {
    if (turn >= minMoveHaveWinner){
        let hasWinner = false
        const [indexesX, indexesO] = getIndexes()

        hasWinner = isWinnerCombination(indexesX)

        if (hasWinner) {
            declareWinner(player1)
            return true
        } else { 
            hasWinner = isWinnerCombination(indexesO)

            if (hasWinner) {
                declareWinner(player2)
                return true
            } else {
                if (turn == 9) {
                    declareWinner()
                    return true
                }
            }
        }
    }
    return false
}

function getIndexes(){
    let indexesX = []
    let indexesO = [] 
    
    boxes.forEach(function callback(value, index){
        if (value.childNodes[0]) {
            element = value.childNodes[0].className
            if (element == 'x') {
                indexesX.push(index)
            } else {
                indexesO.push(index)
            }   
        } 
    })
    return [indexesX, indexesO]
}

function isWinnerCombination(indexes) {

    let containsIndexes = (indexes, target) => target.every(v => indexes.includes(v));

    // Horizontal
    if ((containsIndexes(indexes, [0,1,2])) || (containsIndexes(indexes, [3,4,5])) || (containsIndexes(indexes, [6,7,8]))) {
        return true
    }

    // Vertical
    if ((containsIndexes(indexes, [0,3,6])) || (containsIndexes(indexes, [1,4,7])) || (containsIndexes(indexes, [2,5,8]))) {
        return true
    }

    // Diagonal
    if ((containsIndexes(indexes, [0,4,8])) || (containsIndexes(indexes, [2,4,6]))){
        return true
    }

    return false
}

function declareWinner(winner=0) {
    let msg = ''

    if (winner == player1) {
        msg = 'Player 1 Won'
        let scoreX = document.querySelector('#x-score')
        scoreX.textContent = parseInt(scoreX.textContent) + 1
    } else if (winner == player2) {
        msg = 'Player 2 Won'
        let scoreO = document.querySelector('#o-score')
        scoreO.textContent = parseInt(scoreO.textContent) + 1
    } else if (winner == 0){
        msg = 'Game Over'
    }

    msgText.innerHTML = msg
    msgContainer.classList.remove("hide")
    
    // Disable click while setTimeout is not finished
    container.style.pointerEvents = 'none'

    setTimeout(function(){
        container.style.pointerEvents = 'auto'
        msgContainer.classList.add("hide")
        turn = 0
        clearGame()
    }, 3000)  
}

function clearGame() {
    let boxesRemove = document.querySelectorAll('.box div')   

    for(let i=0; i < boxesRemove.length; i++){   
        boxesRemove[i].parentNode.removeChild(boxesRemove[i])
    }         
}


