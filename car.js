//Constants from The file
const score = document.querySelector(".score")
const game = document.querySelector(".game")
const start = document.querySelector(".start")
const area = document.querySelector(".area")

//Objects
let player = {speed:8, score:0}
let keys = {ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false}

//Event Listners
start.addEventListener("click",started)
document.addEventListener("keydown",on)
document.addEventListener("keyup",off)

//Functions
function started(){
    area.innerHTML = " "
    player.score = 0
    start.classList.add("hide")
    for(let i =0; i < 10; i++){
        let line = document.createElement("div")
        line.classList.add("line")
        line.y = 100*i
        line.style.top = line.y + "px"
        area.appendChild(line)
    }
    let car = document.createElement("div")
    car.classList.add("car")
    area.appendChild(car)
    for(let i = 0; i < 4; i++){
        let enemy = document.createElement("div")
        enemy.classList.add("enemy")
        enemy.style.left = Math.floor(Math.random()*500) + "px"
        enemy.y = ((i+1)*250) * -1
        enemy.style.top = enemy.y + "px"
        area.appendChild(enemy)
    }
    player.play = true
    window.requestAnimationFrame(play)
    
}
//Animation
function play(){
    if(player.play){
        car = document.querySelector(".car")
        movelines()
        moveCar()
        player.score += 1
        score.innerText = `Score:${player.score}`
        let enemies = document.querySelectorAll(".enemy")
        enemies.forEach( ele => {
           if( isCollide(ele,car) ){
               endgame()
           }
            if(ele.y > 560){
                ele.y = -650
                ele.x = Math.floor(Math.random()*500)
            }
            ele.y += player.speed
            ele.style.left = ele.x + "px"
            ele.style.top = ele.y + "px"
        })
        if(keys.Enter){
            endgame()
        }
        window.requestAnimationFrame(play)
    }
}

function isCollide(a,b){
    let ar = a.getBoundingClientRect()
    let br = b.getBoundingClientRect()
    return ! (
        (ar.left > br.right) ||
        (ar.right < br.left) ||
        (ar.top > br.bottom) ||
        (ar.bottom < br.top)

    )
}

function endgame(){
    player.play = false
    score.innerHTML = `GAME OVER <br> Your Score is  ${player.score}`
    window.cancelAnimationFrame(play)
    start.classList.remove("hide")
}
//Earth Movers
function moveCar(){
    let bound = area.getBoundingClientRect()
    let car = document.querySelector(".car")
    car.y = car.offsetTop
    car.x = car.offsetLeft
    if(keys.ArrowUp && car.y > bound.top + 70 ){car.y -= player.speed}
    if(keys.ArrowDown && car.y < bound.height - 125){car.y += player.speed}
    if(keys.ArrowLeft && car.x > 0){car.x -= player.speed}
    if(keys.ArrowRight && car.x < bound.width - 85){car.x += player.speed}
    car.style.top = car.y + "px"
    car.style.left = car.x + "px"  
}
function movelines(){
    let lines = document.querySelectorAll(".line")
    lines.forEach( ele => {
        if(ele.y > 550){
            ele.y -= 700
        }
        ele.y += player.speed
        ele.style.top = ele.y + "px"
    })
}
//Keys Function
function on(e){
    let key = e.key
    keys[key] = true
}
function off(e){
    let key = e.key
    keys[key] = false
}