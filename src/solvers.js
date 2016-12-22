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
  //createBoard function
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
  //mutates values 'LEFT' and 'RIGHT' of placed Queen
  var horizontalQueenify = function(x, y) {
    // create a copy of x starting position for iterating backwards as well
    var otherX = x;
    
    // mutate all queen attack positions to the right of x-axis
    while (board[x][y]) {
      if (board[x][y] === 0) {
        board[x][y] = 'x';
      }
      x++;
    }

    // mutate all queen attack positions to the left of y-axis
    while (board[y][otherX]) {
      if (board[y][otherX] === 0) {
        board[y][otherX] = 'x';
      }
      x--;
    }
  };
  //mutates values 'Top' and 'Bottom' of placed Queen
  var verticalQueenify = function(x, y) {
    var otherY = y;

    // mutate all queen attack positions to the top of y-axis
    while (board[x][y]) {
      if (board[x][y] === 0) {
        board[x][y] = 'x';
      }
      y++;
    }

    // mutate all queen attack positions to the bottom of y-axis
    while (board[y][otherY]) {
      if (board[y][otherY] === 0) {
        board[y][otherY] = 'x';
      }
      y--;
    }
  };
  //mutages values cross diagonally of placed Queen
  var diagonalQueenify = function(x, y) {
    // create starting x,y coordinate for each while loop (4 in total, including original arguments)
    var x1 = x;
    var y1 = y;
    var x2 = x;
    var y2 = y;
    var x3 = x;
    var y3 = y;

    // mutate all queen attack positions to the top left (x--, y++) => using original x,y
    while (board[x][y]) {
      if (board[x][y] === 0) {
        board[x][y] = 'x';
      }
      x--;
      y++;
    }

    // mutate all queen attack positions to the bottom right (x++, y++), using x1, y1 
    while (board[x1][y1]) {
      if (board[x1][y1] === 0) {
        board[x1][y1] = 'x';
      }
      x1++;
      y1++;
    }

    // mutate all queen attack positions to the top right (x++, y--), using x2, y2
    while (board[x2][y2]) {
      if (board[x2][y2] === 0) {
        board[x2][y2] = 'x';
      }
      x2++;
      y2--;
    }

    // mutate all queen attack positions to the bottom left (x--, y++), using x3, y3
    while (board[x3][y3]) {
      if (board[x3][y3] === 0) {
        board[x3][y3] = 'x';
      }
      x3--;
      y3++;
    }
  };
  //calls all three [x,y] mutation methods
  var queenify = function(x, y) {
    horizontalQueenify(x, y);
    verticalQueenify(x, y);
    diagonalQueenify(x, y);
  };

  var correctSolution;
  var queenifyBoard = function(startingX, startingY) {
    // will queenify board for starting queen positions
      // iterate over multidimensional board
      // x,y coordinates correspond to i,j
    var boardCopy = boardCreator(n);
    for (var i = 0; i < boardCopy.length; i++) {
      
      for (var j = 0; j < boardCopy.length; j++) {
        if (boardCopy[i][j] === 0) {
          boardCopy[i][j] = 1;
          queenify(i, j);
        }
      }
    }

    // checks if solution is correct (n argument === number of queens)
    var queenCheck = function() {
      var count = 0;
      for (var i = 0; i < boardCopy.length; i++) {
        for (var j = 0; j < boardCopy.length; j++) {
          if (boardCopy[i][j] === 1) {
            count++;
          }
        }
      }
      return count === n;
    };

    if (queenCheck(boardCopy)) { correctSolution = boardCopy; }
    return queenCheck(boardCopy);
  };

  // create board
  var board = boardCreator(n);

  // create queen starting place coordinates
  // will change these coordinates after each unsuccessful starting queen coordinates
  var queenX = 0;
  var queenY = 0;

  var queenSolution = false;

  while (!queenSolution) {
    queenSolution = true;

    if (!queenifyBoard(queenX, queenY)) {
      queenSolution = false;
      queenX++;

      if (queenX === n) {
        queenX = 0;
        queenY++;
      }

    } 

    return correctSolution;
  }

  // console.log(board);

  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(board));
  // return board;
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