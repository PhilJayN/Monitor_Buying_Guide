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

console.log('TEST GET ITEM', localStorage.getItem('Pick Price Range'));

var dataController = (function() {
//calculation and data structure goes here.
  //
  var Item = function(input, custom) {
    this.input = input;
    this.custom = custom;
  };

  return {
    testMethod: function() {
      // console.log('hiiiii! from testMethod');
    },

    checkStorage: function() {
      var exist;
      if (localStorage.length > 0) {
        exist = true;
      } else {
        exist = false;
      }
      return exist;
    },

    showStorage: function() {
      console.log('LOCAL STORAGE', localStorage);
    },

    addItem: function(header, input, field) {
      var obj, json;
      //Create new obj
      // newitem = new Item(input, custom);
      // localStorage.setItem(header, newItem);
      if(localStorage.length === 0) {
        console.log('localStorage len 0 run');
        //allows for seeding of localStorage if empty, or else using obj.custom results in error
        localStorage.setItem(header, JSON.stringify({input: input, custom: ""}));
        console.log('NOWWWWWWW', localStorage);
      } else {
        console.log('header', header, typeof header);
        console.log('localStorage:', localStorage);
        // console.log('DEMO GET ITEM', localStorage.getItem('Pick Price Range'));
        // localStorage.setItem(header, JSON.stringify(obj));
        localStorage.setItem(header, JSON.stringify({input: input, custom: ""}));
        //make sure to initialize localStorage using setItem with your new header,
        //otherwise you'll get 'null' when attempting to .getItem(header)
        json = localStorage.getItem(header);
        console.log('json:', json);
        //change to obj to manipulate
        obj = JSON.parse(json);
        console.log('OBJECT:', obj);
        //depending on value of input, add input to corresponding key in obj
        if (field === 'add__btn') {
          obj.custom = input;
          console.log('done setting storage!');
        } else {
          obj.input = input;
        }
        console.log('getItem w/', header, localStorage.getItem(header));
        // json = '';
        // obj = '';
      }
    },

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

    //this getEl's purpose is so that you don't have to type in e = e || window.event all the time
    getEl: function(e) {
      //el = element. Side note: In Chrome, and IE, use 'event'. In FireFox, use window.event
      var e, el;
      //must have or Firefox says event not defined
      e = e || window.event;
      // console.log('EVENT', event, 'the target:', event.target);
      el = e.target;
      // console.log('getEl', el);
      return {
        el: el
      }
    },

    getInput: function(e) {
      var el, input;
      el = this.getEl(e).el;
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
      console.log('getInput el', el, input);
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
      if (localStorage.length > 0) {
        // console.log('localStorage len > 0, so running');
        //updateWishlist works by extracting localStorage key (which is a string object),
        //then use JSON.parse to change that string obj. into a JavaScript obj. Now that object
        //is a JavaScript obj and can be maniuplated. Then
        //use for loop to iterate over the JavaScript object
        // console.log('updateWishlist run');
        var target, id, json, obj;
        // var retrievedObj = localStorage.getItem('Pick Aspect Ratio');
        // console.log('retrievedObj:', JSON.parse(retrievedObj).text);
        target = document.querySelector(DOMstrings.wishlistItems);
        //hacky way is to clear all target element's content first before running for loop,
        //or else the UI gets duplicate list items.
        target.innerHTML = "";
        // console.log('wishlist', localStorage);
        // console.log('wishlist .key(0)', localStorage.key(0));
        for (var i = 0; i < localStorage.length; i++) {
          id = localStorage.key(i);

          json = localStorage.getItem(localStorage.key(i));
          console.log('loop json', json);
          // console.log('obj', JSON.parse(json) );
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
            // console.log('key', key);
            // console.log('obj of key', obj[key]);
            // target.insertAdjacentHTML('beforeend', '<li><i class="fas fa-trash del__btn" id="' + id + '"></i>' + localStorage.key(i) + ': '
            // + obj[key] + '</li>');
            text += obj[key];
          }
          // console.log('finalText', text);
          target.insertAdjacentHTML('beforeend', '<li><i class="fas fa-trash del__btn" id="' + id + '"></i>' + localStorage.key(i) + ': TED '
          + text + '</li>');
          // console.log('count', count);
        }

      }
    },

    //maybe erase clearfields and just use  el.previousElementSibling.value = ''; in ctrlAddItem
    clearFields: function(e) {
      var el;
      el = this.getEl(e).el;
      if(e.key === 'Enter') {
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
      // console.log('msgEl', msgEl);
      //only create and append element if it doesn't exist yet
      if (msgEl === null) {
        // console.log('msg el is null!');
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

    getHeader: function(e) {
      var containerParent, text;
      // //traverse to clicked el's parent, and get text of section's header
      containerParent = this.getEl(e).el.parentNode;
      text = containerParent.parentNode.firstElementChild.textContent;
      return {
        text: text
      }
    },
    getObj: function(e) {
      // el = this.getEl(e).el;
      var json, obj;
      json = localStorage.getItem(this.getHeader(e).text);
      console.log('json!!!', json);
      obj = JSON.parse(json);
      // console.log('parsed', obj);
      // obj.input = input;
      console.log('about to return obj:', obj);
      return obj;
    }
  }
})();

// GLOBAL APP CONTROLLER: main job is to call other methods. Those methods
//then call other methods.
var controller = (function(dataCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();
    //The callback function of addEventListener will have access to the event object
    document.querySelector(DOM.wishListbox).addEventListener('click', ctrlDelItem);
    document.querySelector(DOM.container).addEventListener('click', ctrlAddItem);

    document.querySelector(DOM.container).addEventListener('click', UICtrl.getEl);


    document.addEventListener('keypress', function(e){
      var e;
      e = e || window.event;
      if (e.keyCode === 13 || e.which === 13) {
        console.log (e);
        ctrlAddItem(e);
      }
    });
  };

//note that the event object is given to us by the browser. (use whatever name you want)
// calling the getEl method here also gives the getEl method access to the event object
//the el(element) is the one that just got clicked by user
  var ctrlAddItem = function(e) {
    // console.log('ctrlAddItem RUNNING', 'eventobj', e);
    var input, el, parent, header, field;
    el = UICtrl.getEl(e).el;
    parent = el.parentNode.parentNode;
    header = UICtrl.getHeader(e).text;
    console.log('header from ctrlAddItem', header, 'type:', typeof header);
    input = UICtrl.getInput(e).customValue;
    //check that input exists, or you get undefined error when clicking on input field,
    //due to click handler being assigned container parent. Occurs when user types in values to input field
    if (el.classList.contains('add__btn') || el.classList.contains('fa-plus')) {
      field = 'add__btn';
      if (input && input.length > 0) {
        dataCtrl.addItem(header, input, field);
        UICtrl.successMsg(parent);
        UICtrl.clearFields(e);
      }
    }
    else if (el.classList.contains('button-group__btn')) {
      field = 'button-group__btn';
      dataCtrl.addItem(header, input, field);
      UICtrl.successMsg(parent);
    }
    // UICtrl.updateWishlist();
    dataCtrl.showStorage();
    setTimeout(UICtrl.clearMsg, 1000);
  }

  var ctrlDelItem = function(e) {
    var el, id;
    console.log('ctrlDelItem run');
    el = UICtrl.getEl(e).el;
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
      // UICtrl.updateWishlist();
      setupEventListeners();
    }
  }
})(dataController, UIController);

controller.init();
