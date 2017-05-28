// var main = function () {
//   "use strict";
//   //code
// console.log("hi there! testing asdf jskdlaf");
// };
// $(document).ready(main);

var shoppingListController = (function() {
//calculation and data structure goes here.
})();

// code for displaying or updating UI here:
var UIController = (function() {
  return {
    getInput: function() {
      var DOMstrings = {

      };

      return {
        btnText: document.querySelector('.assorted__btn').textContent,
        customValue: document.querySelector('.custom__value').value
      };
    },

    displayItem: function() {
      // document.write();

    }
  }
})();

// GLOBAL APP CONTROLLER: main job is to call other methods
var controller = (function(shoppingListCtrl, UICtrl) {

  var setupEventListeners = function() {
    document.querySelector('.assorted__btn').addEventListener('click', ctrlAddItem);
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
    // document.querySelector('.container').addEventListener('click', ctrlAddItem);

    document.querySelector('.container').addEventListener('click', function(event){
      var elementClicked = event.target;
      var customValue;
      var inputValue;
      if (elementClicked.className === 'add__btn') {
        console.log ('that is an add btn!');
        inputValue = UICtrl.getInput().customValue;
        console.log('inputValue', inputValue);
      }
      else {
        console.log ('not add button!');
        // customValue = elementClicked;
        console.log ('elementClicked:', elementClicked);
        console.log ('elementClicked content:', elementClicked.textContent);

        console.log('customValue', customValue);

      }

    });


    document.addEventListener('keypress', function(event){
      if (event.keyCode === 13 || event.which === 13) {
        console.log ('enter key was pressed');
        ctrlAddItem();
      }
    });

    //attach event listener to parent:
    // var jumbo = document.querySelector('.jumbotron');
    // jumbo.addEventListener('click', function(event) {
    //   // console.log ('clicked a parent');
    //   // console.log ('event:', event);
    //   // console.log ('target is:', event.target);
    //   var elementClicked = event.target;
    //   console.log ('elementClicked class:', typeof elementClicked);
    //   if (elementClicked.className === 'teddy') {
    //     console.log ('you found the add btn!');
    //   }
    // });



  };

  var ctrlAddItem = function(event) {
    // after btn is clicked:
    // 1. get input field input data
    UICtrl.getInput();
    // console.log ('just called UICtrl.getInput:',     UICtrl.getInput().customValue);
    // 2. Add data to to cntroller
    // 3. Add data to UI
    console.log ('btn text content asdf:', UICtrl.getInput().btnText );
    console.log ('custom value from input:', UICtrl.getInput().customValue);
    // add event listener to parent. if the specific target element is of a certain type, or id, or name,
    // then run a code

    UICtrl.displayItem();
  }

  return {
    init: function() {
      setupEventListeners();
    }
  }
})(shoppingListController, UIController);

controller.init();



//attach event listener to parent:
// var jumbo = document.querySelector('.jumbotron');
// jumbo.addEventListener('click', function(event) {
//   // console.log ('clicked a parent');
//   // console.log ('event:', event);
//   // console.log ('target is:', event.target);
//   var elementClicked = event.target;
//   console.log ('elementClicked class:', typeof elementClicked);
//   if (elementClicked.className === 'teddy') {
//     console.log ('you found the add btn!');
//   }
// });


//
// //listen for the element we want to be clicked (delBtn)
// var todoUl = document.querySelector("ul");
// todoUl.addEventListener("click", function(event) {
//   console.log('event', event.target.parentNode.id);
//   var elementClicked = event.target;
//   //get parent of delBtn to use its id as a position for delTodo method,
//   //then feed that as an argument inside the position parameter of delTodo method
// // debugger;
//   if (elementClicked.className === "delBtn") {
//     console.log('list item delete btn clicked');
//     todoList.delTodo(parseInt(elementClicked.parentNode.id));
//     view.displayTodo();
//   }
// });
