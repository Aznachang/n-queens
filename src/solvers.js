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

  var board = boardCreator(n);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board));
  return board;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};