
// !!!.find，.closest功能最重要!!!
// var col = $(this).closest("td").index();
// The closest() method returns the first ancestor of the selected element.

var player1 = prompt("玩家1：請輸入您的名字，您將是橘色");
var player1Color = 'rgb(255, 88, 5)';
                  // rgb(255, 112, 35)
var player2 = prompt("玩家2：請輸入您的名字，您將是綠色");
var player2Color = 'rgb(5, 255, 34)';
                  // rgb(66, 244, 66)

var game_on = true;
var table = $('table tr');

function reportWin(rowNum,colNum) {
  console.log("You won starting at this row,col");
  console.log(rowNum);
  console.log(colNum);
}

function returnColor(rowIndex,colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}


function changeColor(rowIndex,colIndex,color) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function checkBottom(colIndex) {
  var colorReport = returnColor(5,colIndex);
  for (var row = 5; row > -1; row--) {
    colorReport = returnColor(row,colIndex);
    if (colorReport === 'rgb(128, 128, 128)') {
      return row
    }
  }
}

function colorMatchCheck(one,two,three,four){
  return (one===two && one===three && one===four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}
// Out of index 不會報錯，會返回undefined？？？

// function colorExchange(rowIndex,colIndex,color1,color2){
//   if (returnColor(rowIndex,colIndex) === color1){
//     changeColor(rowIndex,colIndex,color2)
//   }else {
//     changeColor(rowIndex,colIndex,color1)
//   }
// }
var intervalSwitch
function winShinning(rowIndex,colIndex,color1,color2){
  // setInterval('colorExchange(rowIndex,colIndex,color1,color2)',250)
  intervalSwitch = window.setInterval(function () {
    if (returnColor(rowIndex,colIndex) === color1){
      changeColor(rowIndex,colIndex,color2)
    }else {
      changeColor(rowIndex,colIndex,color1)
    }
  },250)
}

function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
        console.log('horiz');
        winShinning(row,col,returnColor(row,col),'rgb(255, 5, 71)');
        winShinning(row,col+1,returnColor(row,col),'rgb(255, 5, 71)');
        winShinning(row,col+2,returnColor(row,col),'rgb(255, 5, 71)');
        winShinning(row,col+3,returnColor(row,col),'rgb(255, 5, 71)');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
        console.log('vertical');
        winShinning(row,col,returnColor(row,col),'rgb(255, 5, 71)');
        winShinning(row+1,col,returnColor(row,col),'rgb(255, 5, 71)');
        winShinning(row+2,col,returnColor(row,col),'rgb(255, 5, 71)');
        winShinning(row+3,col,returnColor(row,col),'rgb(255, 5, 71)');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        console.log('diag');
        winShinning(row,col,returnColor(row,col),'rgb(255, 5, 71)');
        winShinning(row+1,col+1,returnColor(row,col),'rgb(255, 5, 71)');
        winShinning(row+2,col+2,returnColor(row,col),'rgb(255, 5, 71)');
        winShinning(row+3,col+3,returnColor(row,col),'rgb(255, 5, 71)');
        reportWin(row,col);
        return true;
      }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        console.log('diag');
        winShinning(row,col,returnColor(row,col),'rgb(255, 20, 176)');
        winShinning(row-1,col+1,returnColor(row,col),'rgb(255, 20, 176)');
        winShinning(row-2,col+2,returnColor(row,col),'rgb(255, 20, 176)');
        winShinning(row-3,col+3,returnColor(row,col),'rgb(255, 20, 176)');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

function gameEnd(winningPlayer) {
  // for (var col = 0; col < 7; col++) {
    // for (var row = 0; row < 7; row++) {
      $('h1').fadeOut('500');
      $('h3').fadeOut('500');
      $('h2').fadeOut('500');
      $('h1').fadeIn('500');
      setTimeout(function functionName() {
        $('h1').text(winningPlayer+" 贏了，恭喜您獲得勝利！！！").css("fontSize", "50px")
      }, 450)

    // }
  // }
}


  var currentPlayer = 1;
  var currentName = player1;
  var currentColor = player1Color;
  // !!!以上方法非常聰明，值得學習!!!

  $('h3').text(player1+": 請 選 擇 一 列，並 投 下 橘 色 圓 盤").css("color", currentColor);


    $('.board button').click(function() {
      var col = $(this).closest("td").index();
      var bottomAvail = checkBottom(col);
      changeColor(bottomAvail,col,currentColor);
      if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
        gameEnd(currentName);

      }
      currentPlayer = currentPlayer * -1 ;

      // Re-Check who the current Player is.
      if (currentPlayer === 1) {
        currentName = player1;
        currentColor = player1Color;
        $('h3').text(currentName+": 請 選 擇 一 列，並 投 下 橘 色 圓 盤").css("color", currentColor);

      }else {
        currentName = player2
        currentColor = player2Color;
        $('h3').text(currentName+": 請 選 擇 一 列，並 投 下 綠 色 圓 盤").css("color", currentColor);

      }

    })

  $('.board button').mouseover(function() {
    var col = $(this).closest("td").index();
    // The closest() method returns the first ancestor of the selected element.
    for (var i = 0; i < 6; i++) {
      table.eq(i).find('td').eq(col).css('background-color','rgb(1, 8, 25)');
    }
    })

  $('.board button').mouseout(function() {
    var col = $(this).closest("td").index();
    // The closest() method returns the first ancestor of the selected element.
    for (var i = 0; i < 6; i++) {
      table.eq(i).find('td').eq(col).css('background-color','#011627');
    }
    })

  $("#restart").click(function () {

    $("table").fadeOut(3000)

    setTimeout(function () {
      for (var i = 0; i <= intervalSwitch; i++){
        window.clearInterval(i);
      }
      // clearInterval(intervalSwitch)

      $("td button").css("background-color", "gray");
      player1 = prompt("玩家1：請輸入您的名字，您將是橘色");
      player2 = prompt("玩家2：請輸入您的名字，您將是綠色");
      currentPlayer = 1;
      currentName = player1;
      currentColor = player1Color;
      // !!!!!!不能寫"var" array1 = [], 否則會新創一個array1變量, 而不是改掉原先的array1!!!!!!
      $('h3').text(player1+": 請 選 擇 一 列，並 投 下 橘 色 圓 盤").css("color", currentColor);
      $('h3').fadeIn('fast');
      $('h2').fadeIn('fast');
      $('h1').text("歡 迎 玩 連 四!")

    }, 3000)


    $("table").fadeIn(3000)
  })
