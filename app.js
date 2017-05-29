// var main = function () {
//   "use strict";
//   //code
// console.log("hi there! testing asdf jskdlaf");
// };
// $(document).ready(main);

localStorage.setItem('brunch', 'mouse');

var shoppingListController = (function() {
//calculation and data structure goes here.
  // var data = {
  //   tempData: ''
  // };
  // localStorage.setItem('brunch', 'eggs');
  // //   var localStorage = {
  // //'brunch': 'eggs'
  // //   };
  // localStorage.getItem('brunch');

})();

// code for displaying or updating UI here:
var UIController = (function() {

  var DOMstrings = {
    tempText: '.tempText',
    assortedBtn: '.assorted__btn',
    addBtn: '.add__btn',
    container: '.container',
    customValue: '.custom__value'

  };

  return {
    getInput: function() {
      // var DOMstrings = {
      //
      // };

      return {
        // btnText: document.querySelector('.assorted__btn').textContent,
        customValue: document.querySelector(DOMstrings.customValue).value
      };
    },

    displayItem: function() {
      //get data from data structure, then display to UI;
      document.querySelector(DOMstrings.tempText).textContent = 'teddsdfsdafy';
      // document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
    },
    getDOMstrings: function() {
      return DOMstrings;
    }
  }
})();

// GLOBAL APP CONTROLLER: main job is to call other methods
var controller = (function(shoppingListCtrl, UICtrl) {


  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.assortedBtn).addEventListener('click', ctrlAddItem);
    document.querySelector(DOM.addBtn).addEventListener('click', ctrlAddItem);
    document.querySelector(DOM.container).addEventListener('click', function(event){


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
    var input;
    var parentKey;
    // after btn is clicked:
    // 1. get input field input data
    input = UICtrl.getInput();
    // shoppingListCtrl.data.tempData = input;
    console.log ('just called UICtrl.getInput:',     UICtrl.getInput().customValue);


    // 3. Add data to UI by calling display method
    UICtrl.displayItem();


    var elementClicked = event.target;
    var customValue;
    var inputValue;
    if (elementClicked.className === 'add__btn') {
      console.log ('that is an add btn!');
      inputValue = UICtrl.getInput().customValue;
      console.log('inputValue', inputValue);

      // 2. Add data to local storage

      // console.log ('event TESTINGASJFKLSJ', event.target.parentNode);
      parentKey = event.target.parentNode;
      // console.log ('parentKeyFirstChild', parentKey);
      console.log ('parentKey', parentKey);
      console.log ('parentKeyFirstChild', parentKey.childNodes[0]);
      console.log ('nodesTEST', parentKey.firstChild);


      localStorage.setItem(parentKey, UICtrl.getInput().customValue);

      UICtrl.displayItem();
    }
    else {
      console.log ('not add button!');
      console.log ('elementClicked:', elementClicked);
      console.log ('elementClicked content:', elementClicked.textContent);
      console.log('customValue', customValue);
      localStorage.setItem('teddy', 'bear');

    }



    // console.log ('btn text content asdf:', UICtrl.getInput().btnText );
    console.log ('custom value from input:', UICtrl.getInput().customValue);
    // add event listener to parent. if the specific target element is of a certain type, or id, or name,
    // then run a code

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
