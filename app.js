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
  return {
    getInput: function() {
            var value = document.querySelector('.add__description').value;
            return value;
    }
  }

})();


// GLOBAL APP CONTROLLER
var controller = (function(shoppingListCtrl, UICtrl) {

  var ctrlAddItem = function() {
    // after btn is clicked:
    // 1. get input field input data
    UICtrl.getInput();
    console.log ('just called UICtrl.getInput, value is:',     UICtrl.getInput());

    // 2. Add data to to cntroller

    // 3. Add data to UI
    console.log ('It works. ctrlAddItem being run...');
  }

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

  // console.log ('you clicked add__btn. Here is the value:', UICtrl.getInput());
  console.log ('test value', UICtrl.getInput());

  // document.querySelectorAll('.test_click').addEventListener('click', function() {
  //   console.log ('you clicked test_click. Here is the value:');
  // });


  // document.querySelector('.add__custom__btn').addEventListener('click', function() {
  //   console.log ('you clikeddd! custum btn');
  // });

  document.addEventListener('keypress', function(event){
    if (event.keyCode === 13 || event.which === 13) {
      console.log ('enter key was pressed');
      ctrlAddItem();
    }
  });


})(shoppingListController, UIController);
