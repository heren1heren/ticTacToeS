const Game = (function(){
    const restartButton = document.querySelector('#restartButton');
    const SHOW_CLASS = 'show';
    const X_CLASS = 'x' // define Macro class for classlist
    const CIRCLE_CLASS = 'circle' // define Macro class for classlist
    const cellElements = document.querySelectorAll('[data-cell]');
    const board = document.querySelector('#board')
    const allWinWay  = [
      [0,1,2], //row
      [3,4,5],
      [6,7,8],
      [0,4,8], //diagonal
      [2,4,6],
      [0,3,6],// column
      [1,4,7],
      [2,5,8],
    ]
    const winningMessage = document.getElementById('winningMessage');
    const winningMessageText = document.querySelector('[data-winning-message-text]');
    let circleTurn = false;
    function startGame() {
   
      cellElements.forEach(cell => {
       cell.classList.remove(X_CLASS);
       cell.classList.remove(CIRCLE_CLASS);})
       cellElements.forEach(cell => {
         cell.addEventListener('click',handleClick,
         {once:true})
       })
       setBoardHover()
   
    }
    restartButton.addEventListener('click', handleRestartButton);
   
    function handleRestartButton() {
   
      winningMessageText.textContent = '';
      winningMessage.classList.remove(SHOW_CLASS);
      startGame();
    }
   
   function setBoardHover(circleTurn) {
   
       board.classList.remove(X_CLASS);
       board.classList.remove(CIRCLE_CLASS);
       if(circleTurn) { 
         board.classList.add(CIRCLE_CLASS);
       } else {
         board.classList.add(X_CLASS);
       }
   }
   
   function handleClick(event) {
     //choose currentClass for placeMark 
      const  currentClass = circleTurn ?  CIRCLE_CLASS : X_CLASS;
      const currentTarget = event.target;
   
     placeMark(currentClass,currentTarget);
   
   
      if (checkWinner(currentClass)) {
        winningMessageText.textContent = ` ${currentClass} Wins`
        winningMessage.classList.add(SHOW_CLASS);
      } else if (checkDraw()) {
       winningMessageText.textContent = `Drawsssss`;
       winningMessage.classList.add(SHOW_CLASS);
      }
      swapTurn();
      setBoardHover(circleTurn);
   }
   
   function placeMark(currentClass,currentTarget) {
     if(currentTarget.classList.contains(CIRCLE_CLASS) || currentTarget.classList.contains(X_CLASS)) return
       currentTarget.classList.add(currentClass);
           
       // link class with allWinWay array don't need to link 
          
   }
   
   function checkWinner(currentClass) {
   //  loop through allWinWay -> access each array 
   //-> check if there is an array that 3 element of the array = currentClass
        return allWinWay.some(subArr => {
         return subArr.every(index => {
           // link boolean from cellElements(dom) and index from an array
           return cellElements[index].classList.contains(currentClass) 
         })
        })
   }
   
   function checkDraw() {
     // check if the allWinWay is full of element
     return allWinWay.every(subArr => {
       return subArr.every(index => {
         return cellElements[index].classList.contains(X_CLASS) || cellElements[index].classList.contains(CIRCLE_CLASS);
       })
   
     })
   }
   
   
   function swapTurn() {
     return circleTurn = !circleTurn;
   }      
  
  
   return {startGame}
 })()
  
    Game.startGame()
  