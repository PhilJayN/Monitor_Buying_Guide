// var main = function () {
//   "use strict";
//   //code
// console.log("hi there! testing asdf jskdlaf");
// };
// $(document).ready(main);
// localStorage.setItem('mykey', 'my val');

var dataController = (function() {
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
    clearFields: function() {
      document.querySelector(DOMstrings.customValue).value = '';
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  }
})();

// GLOBAL APP CONTROLLER: main job is to call other methods. Those methods
//then call other methods.
var controller = (function(shoppingListCtrl, UICtrl) {

  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();
    // document.querySelector(DOM.assortedBtn).addEventListener('click', ctrlAddItem);
    // document.querySelector(DOM.addBtn).addEventListener('click', ctrlAddItem);
    document.querySelector(DOM.container).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event){
      if (event.keyCode === 13 || event.which === 13) {
        console.log ('enter key was pressed');
        ctrlAddItem();
      }
    });

  };

  var ctrlAddItem = function(event) {
    // console.log ('a click event caused ctrlAddItem to be called!');
    var containerParent;
    var elClicked = event.target;
    console.log('ctrlAddItem elClicked', elClicked);
    var inputValue, headerText;
    //traverse to clicked el's parent, and get text of section's header
    containerParent = elClicked.parentNode;
    headerText = containerParent.parentNode.firstElementChild.textContent;

    if (elClicked.classList.contains('add__btn')) {
      console.log ('that is an adddddddd btn!');
      console.log('elClicked has class of add__btn!!!', elClicked.className);
      console.log('header text', headerText);
      // 1. Get input field value. Traverse the DOM in a way that clicking an add__btn
     //get the value of the input field closest to the add__btn clicked.
     inputValue = elClicked.previousElementSibling.value;
     console.log('inputValue', inputValue);
      // inputValue = UICtrl.getInput().customValue;
      // 2. Add data to local storage, and set key/val
      localStorage.setItem(headerText, inputValue);
      UICtrl.clearFields();
    }
    else {
      // console.log ('not add button!');
      // console.log ('elClicked content:', elClicked.textContent);
      //automatically set localStorage key/val pair:
      localStorage.setItem(headerText, elClicked.textContent);
    }

    // console.log ('btn text content asdf:', UICtrl.getInput().btnText );
    // add event listener to parent. if the specific target element is of a certain type, or id, or name,
    // then run a code

  }
  return {
    init: function() {
      setupEventListeners();
    }
  }
})(dataController, UIController);

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
