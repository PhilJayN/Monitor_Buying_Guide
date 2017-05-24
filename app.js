// var main = function () {
//   "use strict";
//   //code
// console.log("hi there! testing asdf jskdlaf");
//
//
// };
//
// $(document).ready(main);


console.log ('hi this is new');

var shoppingListController = (function() {


})();


var UIController = (function() {
console.log ('started auto func');
})();


// GLOBAL APP CONTROLLER
var controller = (function(shoppingListCtrl, UICtrl) {

  document.querySelector('.add__btn').addEventListener('click', function() {
    console.log ('you clikeddd!');
  });

  // document.querySelector('.add__custom__btn').addEventListener('click', function() {
  //   console.log ('you clikeddd! custum btn');
  // });

  document.addEventListener('keypress', function(event){
    if (event.keyCode === 13 || event.which === 13) {
      console.log ('enter key was pressed');
    }
  });


})(shoppingListController, UIController);
