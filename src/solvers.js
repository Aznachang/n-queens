/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, 
// with n rooks placed such that none of them can attack each other

// this.get('n') === length of multidimensional array
// this.get(i) === returns a specific row (subarray) in the multidimensional array


window.findNRooksSolution = function(n) {
  // create an 'nXn BOARD' with all zeroes

  var boardCreator = function(n) {
    var array = [];
    for (var i = 0; i < n; i++) {
      var subArray = [];
      
      for (var j = 0; j < n; j++) {
        subArray.push(0);
      }

      array.push(subArray);
    }
    return array;
  };

  var board = boardCreator(n);
  
  // create idx variable, which is where we will be placing the rook on each sub array
  var idx = 0;

  // loop through board
  for (var i = 0; i < board.length; i++) {
    var sub = board[i];
    
    // for each sub array, assign subarray[idx] to 1 (place rook at this position);
    sub[idx] = 1;
    
    // increment the idx variable at each iteration
    idx++;
  }

  // return board solution
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return board;
};

// return the number of nxn chessboards that exist, 
// with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var factorial = function(n) {
    if (n === 0) {
      return 1;
    }
    return n * factorial(n - 1);
  };

  var solutionCount = factorial(n); 

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, 
// with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var boardCreator = function(n) {
    var array = [];
    for (var i = 0; i < n; i++) {
      var subArray = [];
      for (var j = 0; j < n; j++) {
        subArray.push(0);
      }
      array.push(subArray);
    }
    return array;
  };
  var horizontalQ = function(x, y, board) {
    var otherX = x;
    while (board[x][y]) {
      if (board[x][y] === 0) {
        board[x][y] = 'x';
      }
      x++;
    }
    while (board[y][otherX]) {
      if (board[y][otherX] === 0) {
        board[y][otherX] = 'x';
      }
      x--;
    }
  };
  var verticalQ = function(x, y, board) {
    var otherY = y;
    while (board[x][y]) {
      if (board[x][y] === 0) {
        board[x][y] = 'x';
      }
      y++;
    }
    while (board[y][otherY]) {
      if (board[y][otherY] === 0) {
        board[y][otherY] = 'x';
      }
      y--;
    }
  };
  var diagonalQ = function(x, y, board) {
    var x1 = x;
    var y1 = y;
    var x2 = x;
    var y2 = y;
    var x3 = x;
    var y3 = y;

    while (board[x][y]) {
      if (board[x][y] === 0) {
        board[x][y] = 'x';
      }
      x--;
      y++;
    }
    while (board[x1][y1]) {
      if (board[x1][y1] === 0) {
        board[x1][y1] = 'x';
      }
      x1++;
      y1++;
    }
    while (board[x2][y2]) {
      if (board[x2][y2] === 0) {
        board[x2][y2] = 'x';
      }
      x2++;
      y2--;
    }
    while (board[x3][y3]) {
      if (board[x3][y3] === 0) {
        board[x3][y3] = 'x';
      }
      x3--;
      y3++;
    }
  };
  //boolean - if solution has 'n' queens placed on board on 'nxn' board
  var nCheck = function(n) {
    var count = 0;
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; i++) {
        if (board[i][j] === 1) {
          count++;
        }
      }
    }
    return count === n;
  };
  if (n === 0) {
    return [];
  } else if (n === 1) {
    return [[1]];
  } else if (n === 2) {
    return;
  } else if (n === 3) {
    return; 
  }
  var solution;
  var queenify = function(startingX, startingY) {
    var board = boardCreator(n);
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board.length; j++) {
        if (board[i][j] === 0) {
          board[i][j] = 1;
          horizontalQ(i, j, board);
          verticalQ(i, j, board);
          diagonalQ(i, j, board);
        }
      }
    }
    if (nCheck(board)) {
      solution = board;
    }
    return nCheck(board) ? true : false;
  };

  var formatted;
  for (var i = 0; i < n; i++) {
    formatted = solution;
    var queened = queenify(i, 0);

    //solution found - iterate through board and replace 'x' spaces with 0
    if (queened) {
      for (var l = 0; l < formatted.length; l++) {
        for (var m = 0; m < formatted[i].length; m++) {
          if (solution[i][j] === 'x') {
            solution[i][j] = 0;
          }
        }
      }
    }
  }

  return !!formatted ? formated : 'no solution found';
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  //1st Queen can 'attack' vertical, horizontal '[row][col]'' square-spaces
    //Cross-out these spaces
    //For the 'next-Queen', 'concat' these additional spaces (see step 1) 

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};