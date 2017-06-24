// var main = function () {
//   "use strict";
//   //code
// };
// $(document).ready(main);

// function start() {
// }
// start();
// console.log('start');
// function stop() {
//   console.log('stop');
// }
// setTimeout(stop, 3000);

var dataController = (function() {
//calculation and data structure goes here.
// console.log('inside dataController');
  return {
    testMethod: function() {
      console.log('hiiiii! from testMethod');
    }
  }
})();

// code for displaying or updating UI here:
var UIController = (function() {
  var DOMstrings = {
    tempText: '.tempText',
    assortedBtn: '.assorted__btn',
    addBtn: '.add__btn',
    delBtn: '.del__btn',
    container: '.container',
    customValue: '.custom__value',
    wishListbox: '.wishlist-box',
    wishlistItems: '.wishlist-items',
    //msg will use getElementById, so don't use a period before name
    msg: 'success-msg',
  };

  return {
    checkStorage: function() {
      var exist;
      if (localStorage.length > 0) {
        exist = true;
      } else {
        exist = false;
      }
      return exist;
      // return {
      //   //only want exist to return true or false
      //   exist: exist
      // }
    },

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

    getEl: function(event) {
      //el = element. Side note: In Chrome, and IE, use 'event'. In FireFox, use window.event
      var el;
      //must have or Firefox says event not defined
      event = event || window.event;
      // console.log('EVENT', event, 'the target:', event.target);
      el = event.target;
      return {
        el: el
      }
    },

    getInput: function(event) {
      // console.log('event', event);
      var el, input;
      el = this.getEl(event).el;
      //only get input if the btn clicked is add__btn. getInput needs access to the target element, otherwise its useless
      if (el.classList.contains('add__btn')) {
      //Get input field value. Traverse the DOM in a way that clicking an add__btn
      //gets the value of the input field closest to the add__btn clicked.
       input = el.previousElementSibling.value;
     }
      else if (el.classList.contains('form-control')) {
       input = el.value;
      }
      else if (el.classList.contains('button-group__btn')) {
       input = el.textContent;
      }
      return {
        customValue: input
      };
    },

    addListItem: function() {
      var html, newHtml, el;
      var demo = localStorage.getItem('Intended Audience');
      newHtml = '<li>' + demo + '</li>';
      // Insert newly created HTML to DOM
      document.querySelector(DOMstrings.wishlistItems).insertAdjacentHTML('beforeend', newHtml);
    },
    updateWishlist: function() {
      // if(this.checkStorage()) {
      //   console.log('localStorage is not empty!');
      // }
      //updateWishlist works by extracting localStorage key (which is a string object),
      //then use JSON.parse to change that string obj. into a JavaScript obj. Then
      //use for loop to iterate over the JavaScript object
      // console.log('updateWishlist run');
      // console.log('key', localStorage.key(0));
      var target, id, json, obj;
      // var retrievedObj = localStorage.getItem('Pick Aspect Ratio');
      // console.log('retrievedObj:', JSON.parse(retrievedObj).text);
      target = document.querySelector(DOMstrings.wishlistItems);
      //hacky way is to clear all target element's content first before running for loop,
      //or else the UI gets duplicate list items.
      target.innerHTML = "";
      console.log('wishlist', localStorage);
      console.log('wishlist .key(0)', localStorage.key(0));
      for (var i = 0; i < localStorage.length; i++) {
        id = localStorage.key(i);
        json = localStorage.getItem(localStorage.key(i));
        console.log('obj', JSON.parse(json) );
        //localStorage only supports string. So we need to convert btw object and
        //string to manipulate localStorage data
        obj = JSON.parse(json);
        // + id allows us to use that id later as key to use localStorage.removeItem(id)
        // target.insertAdjacentHTML('beforeend', '<li><i class="fas fa-trash del__btn" id="' + id + '"></i>' + localStorage.key(i) + ': '
        // + localStorage.getItem(localStorage.key(i)) + '</li>');
        //for in to loop through every key of obj, store result in a variable to be used later
        var count = 0;
        var text = '';
        for (var key in obj) {
          count +=1;
          console.log('key', key);
          console.log('obj of key', obj[key]);
          // target.insertAdjacentHTML('beforeend', '<li><i class="fas fa-trash del__btn" id="' + id + '"></i>' + localStorage.key(i) + ': '
          // + obj[key] + '</li>');
          text += obj[key];
        }
        console.log('finalText', text);
        target.insertAdjacentHTML('beforeend', '<li><i class="fas fa-trash del__btn" id="' + id + '"></i>' + localStorage.key(i) + ': TED '
        + text + '</li>');
        console.log('count', count);
      }
    },

    //maybe erase clearfields and just use  el.previousElementSibling.value = ''; in ctrlAddItem
    clearFields: function(event) {
      var el;
      el = this.getEl(event).el;
      if(event.key === 'Enter') {
        el.value = '';
      }
      else if (el.classList.contains('add__btn')) {
        el.previousElementSibling.value = '';
      }
    },

    successMsg: function(parent) {
      var msg;
      console.log('parentdsfa', parent);
      msgEl = document.getElementById('success-msg');
      console.log('msgEl', msgEl);
      //only create and append element if it doesn't exist yet
      if (msgEl === null) {
        console.log('msg el is null!');
        console.log(this.createDiv());
        parent.appendChild(this.createDiv());
      }
    },

    clearMsg: function() {
      var msg;
      msg = document.getElementById(DOMstrings.msg);
      //only remove element if it actually exist, or you'll get parentNode does not exist error
      if(msg !== null) {
        msg.parentNode.removeChild(msg);
      }
    },

    getDOMstrings: function() {
      return DOMstrings;
    },

    getHeader: function(event) {
      var containerParent, text;
      // //traverse to clicked el's parent, and get text of section's header
      containerParent = this.getEl(event).el.parentNode;
      text = containerParent.parentNode.firstElementChild.textContent;
      return {
        text: text
      }
    }
  }
})();

// GLOBAL APP CONTROLLER: main job is to call other methods. Those methods
//then call other methods.
var controller = (function(dataCtrl, UICtrl) {
  console.log('dataCtrl!!', dataCtrl.testMethod());
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();
    //The callback function of addEventListener will have access to the event object
    document.querySelector(DOM.wishListbox).addEventListener('click', ctrlDelItem);
    document.querySelector(DOM.container).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event){
      event = event || window.event;
      // console.log('final event', event);
      if (event.keyCode === 13 || event.which === 13) {
        console.log (event);
        ctrlAddItem(event);
      }
    });
  };

//note that the event object is given to us by the browser. we can call it whatever name we want
// calling the getEl method here also gives the getEl method access to the event object
//the el(element) is the one that just got clicked by user
  var ctrlAddItem = function(event) {
    console.log('ctrlAddItem RUNNING', 'eventobj', event);
    var input, el, parent, json, obj;
    el = UICtrl.getEl(event).el;
    // console.log('el', el);
    parent = el.parentNode.parentNode;
    input = UICtrl.getInput(event).customValue;
    //store as an obj first:
    // obj = {input: input, custom: 'bearTed'};
    //make sure localStorage isn't empty
    // if (localStorage.length > 0) {
    //   json = localStorage.getItem(UICtrl.getHeader(event).text);
    //   console.log('json!!!', json);
    //   obj = JSON.parse(json);
    //   console.log('parsed', obj);
    // }

    //make sure that input actually exists, otherwise undefined error when clicking on input field,
    //due to click handler being assigned container parent
    //happens when user types in values to input field
    if (el.classList.contains('add__btn') || el.classList.contains('fa-plus')) {
      console.log('add__btn!! fa plus');
      if (input && input.length > 0) {
        //run when localStorage is empty
        if (localStorage.length === 0) {
          localStorage.setItem(UICtrl.getHeader(event).text, JSON.stringify({input: input, custom:''}));
        }
        else {
          json = localStorage.getItem(UICtrl.getHeader(event).text);
          console.log('json!!!', json);
          obj = JSON.parse(json);
          console.log('parsed', obj);
          obj.input = input;
          localStorage.setItem(UICtrl.getHeader(event).text, JSON.stringify(obj));
        }
        //put obj into localStorage as a string
          // if (obj.hasOwnProperty('input')) {
          //   console.log('obj.input', obj.input);
          //   obj.input = input;
          //   localStorage.setItem(UICtrl.getHeader(event).text, JSON.stringify(obj));
          // }
        // var retrievedObj = localStorage.getItem('Pick Aspect Ratio');
        // console.log('retrievedObj:', JSON.parse(retrievedObj).text);
      }
      // UICtrl.successMsg(parent);
    }
    // else if (el.classList.contains('button-group__btn')) {
    //   obj.custom = input;
    //   localStorage.setItem(UICtrl.getHeader(event).text, JSON.stringify(obj));
    // }
    // UICtrl.clearFields(event);
    // UICtrl.updateWishlist();
    // setTimeout(UICtrl.clearMsg, 1000);
  }

  var ctrlDelItem = function(event) {
    var el, id;
    console.log('ctrlDelItem run');
    el = UICtrl.getEl(event).el;
    if (el.classList.contains('del__btn') || el.classList.contains('fa-trash') ) {
      console.log('del btn! newdd! pressed');
      console.log(el);
      //get id from element html id attribute
      id = el.getAttribute('id');
      console.log('asjdfkl id', id);
      localStorage.removeItem(id);
      UICtrl.updateWishlist();
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
