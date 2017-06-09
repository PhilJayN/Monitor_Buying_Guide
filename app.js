// var main = function () {
//   "use strict";
//   //code
// console.log("hi there! testing asdf jskdlaf");
// };
// $(document).ready(main);
// localStorage.setItem('mykey', 'my val');
console.log('hey ther');
// console.log('localStorage', localStorage.getItem(key(0)));
var dataController = (function() {
//calculation and data structure goes here.
  // var data = {
  //   tempData: ''
  // };
  // localStorage.setItem('brunch', 'eggs');
  // localStorage.first = "1";
  // localStorage.second = "2";
  // localStorage.third = "3";

  // localStorage.first = "eggs";
  // localStorage.second = "Ken";
  // localStorage.third = "Or";

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
    customValue: '.custom__value',
    wishlistItems: '.wishlist-items'
  };

  return {
    getInput: function() {
      //only get input if the btn clicked is add__btn. getInput needs access to the target element, otherwise its useless
      var el, inputValue;
      el = event.target;
      // console.log('el (event.target)', el);
      if (el.classList.contains('add__btn')) {
        console.log ('that is an adddddddd btn!');
        console.log('el has class of add__btn!!!', el.className);
        // 1. Get input field value. Traverse the DOM in a way that clicking an add__btn
       //get the value of the input field closest to the add__btn clicked.
       inputValue = el.previousElementSibling.value;
       console.log('inputValue', inputValue, 'TYPE', typeof inputValue);
        // 2. Add data to local storage, and set key/val
        // localStorage.setItem(headerTxt, inputValue);
        // UICtrl.clearFields();
        // UICtrl.addListItem();
      }
      return {
        // btnText: document.querySelector('.assorted__btn').textContent,
        customValue: inputValue
      };
    },
    displayItem: function() {
      //get data from data structure, then display to UI
      document.querySelector(DOMstrings.wishlistItems).textContent = 'teddsdfsdafy';
      // document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
    },
    addListItem: function() {
      //el = element
      console.log('addListItem running!');
      var html, newHtml, el;
      var demo = localStorage.getItem('Intended Audience');
      console.log('demo!', typeof demo);
      newHtml = '<li>' + demo + '</li>';
      // Insert newly created HTML to DOM
      document.querySelector(DOMstrings.wishlistItems).insertAdjacentHTML('beforeend', newHtml);
      // document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },
    displayWishlist: function() {
      var target;
      target = document.querySelector(DOMstrings.wishlistItems);
      for (var i = 0; i < localStorage.length; i++) {
        console.log(localStorage.getItem(localStorage.key(i)));
        target.insertAdjacentHTML('beforeend', '<li>' + localStorage.getItem(localStorage.key(i)) + '</li>');
    // document.querySelector(DOMstrings.wishlistItems).insertAdjacentHTML('beforeend', items);
      }

      var items = localStorage.getItem('Intended Audience');
    },
    clearFields: function() {
      document.querySelector(DOMstrings.customValue).value = '';
    },
    getDOMstrings: function() {
      return DOMstrings;
    },
    // getEl: function() {
    //   console.log('el', event);
    // },

    getHeaderTxt: function() {
      // document.querySelector(DOMstrings.wishlistItems).textContent = 'teddsdfsdafy';
      console.log('event', event);
      console.log('event target', event.target);
      var containerParent, headerTxt;
      var el = event.target;
      // //traverse to clicked el's parent, and get text of section's header
      containerParent = el.parentNode;
      headerTxt = containerParent.parentNode.firstElementChild.textContent;
      console.log('header', headerTxt);
      return {
        headerTxt: headerTxt
      }

      // if (el.classList.contains('add__btn')) {
      //   console.log ('that is an adddddddd btn!');
      //   console.log('el has class of add__btn!!!', el.className);
      //   console.log('header text', headerTxt);
      //   // 1. Get input field value. Traverse the DOM in a way that clicking an add__btn
      //  //get the value of the input field closest to the add__btn clicked.
      //  inputValue = el.previousElementSibling.value;
      //  console.log('inputValue', inputValue);
      //   // inputValue = UICtrl.getInput().customValue;
      //   // 2. Add data to local storage, and set key/val
      //   localStorage.setItem(headerTxt, inputValue);
      //   UICtrl.clearFields();
      //   UICtrl.addListItem();
      // }

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

    // document.addEventListener('keypress', function(event){
    //   if (event.keyCode === 13 || event.which === 13) {
    //     console.log ('keypress event', event);
    //     ctrlAddItem();
    //   }
    // });

  };

  // document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
  //
  // document.addEventListener('keypress', function(event) {
  //     if (event.keyCode === 13 || event.which === 13) {
  //         ctrlAddItem();
  //     }
  // });

  var ctrlAddItem = function(event) {
    // console.log('len', UICtrl.getInput().customValue.length,     typeof UICtrl.getInput().customValue);
    var input;
    input = UICtrl.getInput().customValue;
    //make sure that input actually exists, otherwise undefined error when clicking on input field,
    //due to click handler being assigned container parent
    if (input && input.length > 0) {
      console.log('found len is > 0!!');
      localStorage.setItem(UICtrl.getHeaderTxt().headerTxt, input);
    }
    // else {
    //   // console.log ('not add button!');
    //   // console.log ('el content:', el.textContent);
    //   //automatically set localStorage key/val pair:
    //   localStorage.setItem(headerText, el.textContent);
    // }
  }
  return {
    init: function() {
      UICtrl.displayWishlist();
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
