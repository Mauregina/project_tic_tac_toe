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
            console.log(turn)
        }
    })
}

function createElement(turn) {
    if (turn%2 == 0) { // its player 1
        let cloneElement = x.cloneNode(true)
        return cloneElement
    } 
    
    let cloneElement = o.cloneNode(true)
    return cloneElement
}