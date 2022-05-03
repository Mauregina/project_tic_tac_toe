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

        if (turn > 4){ 
            console.log('Jogo finalizado')
            winner = hasWinner()
        }
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

const hasWinner = () => {
    const [indexesX, indexesO] = getIndexes()

    console.log(indexesX)
    console.log(indexesY)
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



