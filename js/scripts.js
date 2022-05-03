let boxes = document.querySelectorAll('.box')
let x = document.querySelector('.x')
let o = document.querySelector('.o')

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
    if (turn > 4){ 
        let hasWinner = false
        const [indexesX, indexesO] = getIndexes()

        hasWinner = isCorrectCombination(indexesX)

        if (hasWinner) {
            console.log('Jogador 1 ganhou')
        } else { 
            hasWinner = isCorrectCombination(indexesO)

            if (hasWinner) {
                console.log('Jogador 2 ganhou')
            } else {
                if (turn == 9) {
                    console.log('Velhou!') 
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
    let indexesStr = JSON.stringify(indexes) 

    // Horizontal
    if ((indexesStr == JSON.stringify([0,1,2])) || (indexesStr == JSON.stringify([3,4,5])) || (indexesStr == JSON.stringify([6,7,8]))) {
        return true
    }

    // Vertical
    if ((indexesStr == JSON.stringify([0,3,6])) || (indexesStr == JSON.stringify([1,4,7])) || (indexesStr == JSON.stringify([2,5,8]))) {
        return true
    }

    // Diagonal
    if ((indexesStr == JSON.stringify([0,4,8])) || (indexesStr == JSON.stringify([2,4,6]))){
        return true
    }

    return false
}



