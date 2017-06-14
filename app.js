// var main = function () {
//   "use strict";
//   //code
// };

// $(document).ready(main);
// localStorage.setItem('mykey', 'my val');
// console.log('localStorage', localStorage.getItem(key(0)));

console.log('hiii');
// function start() {
// }
// start();
// console.log('start');
// function stop() {
//   console.log('stop');
// }
// setTimeout(stop, 3000);
// alert('hi!');

var dataController = (function() {
//calculation and data structure goes here.
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
    wishlistItems: '.wishlist-items',
    //msg will use getElementById, so don't use a period before name
    msg: 'success-msg',
  };

  // <div class="alert alert-success msg" role="alert">
  //   Added to wishlist!
  // </div>
  return {
    createDiv: function() {
      var div;
      div = document.createElement('div');
      div.className = 'alert alert-success msg';
      div.role = 'alert';
      div.id = 'success-msg';
      // div.createAttribute('role');
      div.innerText = 'Added!';
      return div;
    },
    getEl: function() {
      //el = element
      var el;
      el = event.target;
      console.log('getEl running, el', el);
      return {
        el: el
      }
    },
    getInput: function() {
      var inputValue;
      // console.log('el (event.target)', el);
      //only get input if the btn clicked is add__btn. getInput needs access to the target element, otherwise its useless
      if (this.getEl().el.classList.contains('add__btn')) {
        // console.log ('that is an adddddddd btn!');
        // console.log('el has class of add__btn!!!', this.getEl().el.className);
        // 1. Get input field value. Traverse the DOM in a way that clicking an add__btn
       //get the value of the input field closest to the add__btn clicked.
       inputValue = this.getEl().el.previousElementSibling.value;
       // console.log('inputValue', inputValue, 'TYPE', typeof inputValue);
      }
      return {
        customValue: inputValue
      };
    },
    displayItem: function() {
      //get data from data structure, then display to UI
      document.querySelector(DOMstrings.wishlistItems).textContent = 'teddsdfsdafy';
    },
    addListItem: function() {
      //el = element
      // console.log('addListItem running!');
      var html, newHtml, el;
      var demo = localStorage.getItem('Intended Audience');
      // console.log('demo!', typeof demo);
      newHtml = '<li>' + demo + '</li>';
      // Insert newly created HTML to DOM
      document.querySelector(DOMstrings.wishlistItems).insertAdjacentHTML('beforeend', newHtml);
    },
    updateWishlist: function() {
      var target;
      target = document.querySelector(DOMstrings.wishlistItems);
      //hacky way is to clear all target element's content first before running for loop,
      //or else the UI gets duplicate list items.
      target.innerHTML = "";
      for (var i = 0; i < localStorage.length; i++) {
        // console.log(localStorage.getItem(localStorage.key(i)));
        target.insertAdjacentHTML('beforeend', '<li>' + localStorage.getItem(localStorage.key(i)) + '</li>');
      }
      var items = localStorage.getItem('Intended Audience');
    },
    //maybe erase clearfields and just use  el.previousElementSibling.value = ''; in ctrlAddItem
    clearFields: function() {
      var el;
      el = this.getEl().el;
      el.previousElementSibling.value = '';
    },
    clearMsg: function() {
      var msg;
      msg = document.getElementById(DOMstrings.msg);
      msg.parentNode.removeChild(msg);
    },
    getDOMstrings: function() {
      return DOMstrings;
    },
    getHeaderTxt: function() {
      // console.log('event', event);
      // console.log('event target', event.target);
      var containerParent, headerTxt;
      // var el = event.target;
      // //traverse to clicked el's parent, and get text of section's header
      containerParent = this.getEl().el.parentNode;
      headerTxt = containerParent.parentNode.firstElementChild.textContent;
      // console.log('header', headerTxt);
      return {
        headerTxt: headerTxt
      }
    }
  }
})();

// GLOBAL APP CONTROLLER: main job is to call other methods. Those methods
//then call other methods.
var controller = (function(shoppingListCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.container).addEventListener('click', ctrlAddItem);
    // document.addEventListener('keypress', function(event){
    //   if (event.keyCode === 13 || event.which === 13) {
    //     console.log ('keypress event', event);
    //     ctrlAddItem();
    //   }
    // });
  };

//note that the event object is given to us by the browser. we can call it whatever name we want
  var ctrlAddItem = function(event) {
    // console.log('len', UICtrl.getInput().customValue.length,     typeof UICtrl.getInput().customValue);
    var input, el, parent, newEl, msgEl;
    // calling the getEl method here also gives the getEl method access to the event object
    //the el(element) is the one that just got clicked by user
    el = UICtrl.getEl().el;
    parent = el.parentNode.parentNode;
    input = UICtrl.getInput().customValue;
    console.log('parent has success-msg el expected: false!', parent.contains(msgEl));
    //make sure that input actually exists, otherwise undefined error when clicking on input field,
    //due to click handler being assigned container parent
    if (input && input.length > 0) {
      //Add data to local storage, and set key/val
      localStorage.setItem(UICtrl.getHeaderTxt().headerTxt, input);
      msgEl = document.getElementById('success-msg');
      console.log('msgEl', msgEl);
      //only create and append element if it doesn't exist yet
      if (msgEl === null) {
        parent.appendChild(UICtrl.createDiv());
      }
      // el.previousElementSibling.value = '';
      UICtrl.clearFields();
      UICtrl.updateWishlist();
      setTimeout(UICtrl.clearMsg, 1000);
      // UICtrl.clearMsg();
    }
  }
  return {
    init: function() {
      UICtrl.updateWishlist();
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
