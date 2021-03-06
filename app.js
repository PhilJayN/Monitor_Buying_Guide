var dataController = (function() {
//calculation and data structure goes here.
  var Item = function(input, custom) {
    this.input = input;
    this.custom = custom;
  };

  return {
    showStorage: function() {
      console.log('LOCAL STORAGE', localStorage);
    },

    addItem: function(header, input, field) {
      var obj, json;
      if(localStorage.length === 0) {
        //allows for seeding of localStorage if empty, or else using obj.custom results in error
        //the if/else allows for proper key in localStorage to be selected
        if (field === 'custom') {
          localStorage.setItem(header, JSON.stringify({input: "", custom: input}));
        } else {
          localStorage.setItem(header, JSON.stringify({input: input, custom: ""}));
        }
      } else {
        // console.log('header', header, typeof header);
        //IMPORTANT! create a localStorage property using the header as a key,
        //...only if it doesn't exist in localStorage
        if (localStorage.getItem(header) === null) {
          localStorage.setItem(header, JSON.stringify({input: input, custom: ""}));
        }
        //make sure to initialize localStorage using setItem with your new header,
        //otherwise you'll get 'null' when attempting to .getItem(header)
        json = localStorage.getItem(header);
        //change to object to manipulate
        obj = JSON.parse(json);
        //depending on value of input, add input to corresponding key in obj
        if (field === 'custom') {
          obj.custom = input;
          localStorage.setItem(header, JSON.stringify(obj));
        }
        else if (field === 'button-group__btn') {
          obj.input = input;
          localStorage.setItem(header, JSON.stringify(obj));
        }
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
    wishlistSum: '.wishlist-summary',
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

    //this getEl's purpose is so that you don't have to type in e = e || window.event in every method
    getEl: function(e) {
      //el = element. Side note: In Chrome, and IE, use 'event'. In FireFox, use window.event
      var e, el;
      //must have or Firefox says event not defined
      e = e || window.event;
      // console.log('EVENT', event, 'the target:', event.target);
      el = e.target;
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
      return {
        customValue: input
      };
    },

    addListItem: function() {
      var html, newHtml, el;
      var demo = localStorage.getItem('Intended Audience');
      newHtml = '<li>' + demo + '</li>';
      document.querySelector(DOMstrings.wishlistItems).insertAdjacentHTML('beforeend', newHtml);
    },
    updateWishlist: function() {
        //updateWishlist works by extracting localStorage key (which is a string object),
        //then use JSON.parse to change that string obj. into a JavaScript obj. Now that object
        //is a JavaScript object and can thus be maniuplated. Then
        //use for loop to iterate over the JavaScript object
        var target, id, json, obj;
        target = document.querySelectorAll(DOMstrings.wishlistItems);
        //hacky way is to clear all target element's content first before running for loop,
        //or else the UI gets duplicate list items.
        target[0].innerHTML = "";
        target[1].innerHTML = "";
        if (localStorage.length > 0) {
          //loop through localStorage key (header)
          for (var i = 0; i < localStorage.length; i++) {
            //id allows us to use that id later as key to use localStorage.removeItem(id)
            id = localStorage.key(i);
            json = localStorage.getItem(localStorage.key(i));
            //localStorage only supports string. So we need to convert btw object and
            //string to manipulate localStorage data
            obj = JSON.parse(json);
            //for in to loop through every key of obj, store result in a variable to be used later
            var count = 0;
            var text = '';
            var separator = '|';
            //for every localStorage key(header), loop through every property
            for (var prop in obj) {
              // console.log('obj:', obj, 'key', key);
              // console.log('obj of key', obj[key]);
              if (count === 0) {
                text = text + obj[prop] + ' | ';
                count += 1;
              } else {
                text = text + obj[prop];
              }
            }
            target[0].insertAdjacentHTML('beforeend', '<li><i class="fas fa-trash del__btn" id="' + id + '"></i>'
            + localStorage.key(i) + ': ' + text + '</li>');
            target[1].insertAdjacentHTML('beforeend', '<li><i class="fas fa-trash del__btn" id="' + id + '"></i>'
            + localStorage.key(i) + ': ' + text + '</li>');
          }
      }
    },

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
      msgEl = document.getElementById('success-msg');
      //only create and append element if it doesn't exist yet
      if (msgEl === null) {
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
      // console.log('containerParent', containerParent, 'node', containerParent.parentNode);
      text = containerParent.parentNode.firstElementChild.textContent;
      return {
        text: text
      }
    },
  }
})();

// GLOBAL APP CONTROLLER: main job is to call other methods. Those methods
//then call other methods.
var controller = (function(dataCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();
    //The callback function of addEventListener will have access to the event object
    document.querySelector(DOM.wishListbox).addEventListener('click', ctrlDelItem);
    document.querySelector(DOM.wishlistSum).addEventListener('click', ctrlDelItem);
    document.querySelector(DOM.container).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(e){
      var e;
      e = e || window.event;
      if (e.keyCode === 13 || e.which === 13) {
        console.log ('ENTER KEY PRESSED!' );
        ctrlAddItem(e);
      }
    });
  };

//note that the event object is given to us by the browser. (use whatever name you want)
//calling the getEl method here also gives the getEl method access to the event object
//the el(element) is the one that just got clicked by user
  var ctrlAddItem = function(e) {
    // console.log('ctrlAddItem RUNNING', 'e:', e);
    var input, el, parent, header, field;
    el = UICtrl.getEl(e).el;
    parent = el.parentNode.parentNode;
    header = UICtrl.getHeader(e).text;
    input = UICtrl.getInput(e).customValue;
    //check that input exists, or you get undefined error when clicking on input field,
    //due to click handler being assigned container parent. Occurs when user types in values to input field
    if (el.classList.contains('add__btn') || el.classList.contains('fa-plus') || e.target.tagName === 'INPUT' ){
      field = 'custom';
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
    UICtrl.updateWishlist();
    dataCtrl.showStorage();
    setTimeout(UICtrl.clearMsg, 1000);
  }

  var ctrlDelItem = function(e) {
    var el, id;
    el = UICtrl.getEl(e).el;
    if (el.classList.contains('del__btn') || el.classList.contains('fa-trash') ) {
      id = el.getAttribute('id');
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
