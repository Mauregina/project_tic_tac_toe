let boxes = document.querySelectorAll('.box')
let x = document.querySelector('.x')
let o = document.querySelector('.o')
let msgContainer = document.querySelector('#message')
let msgText = document.querySelector('#message p')

turn = 0

for(let i=0; i < boxes.length; i++){
    boxes[i].addEventListener("click", () => {

        let alreadyExistElement = boxes[i].childNodes.length > 0

        if (!alreadyExistElement) {
            let newElement = createElement(turn)
            boxes[i].appendChild(newElement) 
            turn++
        }

        checkHasWinner(turn)
    })
}

const createElement = (turn) => {
    if (turn%2 == 0) { // its player 1
        let cloneElement = x.cloneNode(true)
        return cloneElement
    } 
    
    let cloneElement = o.cloneNode(true)
    return cloneElement
}

const checkHasWinner = (turn) => {
    if (turn > 4){ // Minimum move to have a winner
        let hasWinner = false
        const [indexesX, indexesO] = getIndexes()

        hasWinner = isCorrectCombination(indexesX)

        if (hasWinner) {
            declareWinner(1)
        } else { 
            hasWinner = isCorrectCombination(indexesO)

            if (hasWinner) {
                declareWinner(2)
            } else {
                if (turn == 9) {
                    declareWinner()
                }
            }
        }
    }
}

const getIndexes = () => {
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

const isCorrectCombination = (indexes) => {

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
    turn = 0

    if (winner == 1) {
        msg = 'Player 1 won'
        let scoreX = document.querySelector('#x-score')
        scoreX.textContent = parseInt(scoreX.textContent) + 1
    } else if (winner == 2) {
        msg = 'Player 2 won'
        let scoreO = document.querySelector('#o-score')
        scoreO.textContent = parseInt(scoreO.textContent) + 1
    } else if (winner == 0){
        msg = 'No winner'
    }

    msgText.innerHTML = msg
    msgContainer.classList.remove("hide")
    
    // Disable click while setTimeout is not finished
    let container = document.querySelector('#container')
    container.style.pointerEvents = 'none'

    setTimeout(function(){
        container.style.pointerEvents = 'auto'
        msgContainer.classList.add("hide")
        clearGame()
    }, 3000)  
}

function clearGame() {
    let boxesRemove = document.querySelectorAll('.box div')   

    for(let i=0; i < boxesRemove.length; i++){   
        boxesRemove[i].parentNode.removeChild(boxesRemove[i])
    }         
}


