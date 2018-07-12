//set 'keydown' to all inputs
document.addEventListener("DOMContentLoaded", function(){ 
  var allInputs = document.querySelectorAll('input,[tabindex]:not([tabindex="-1"])');
  for (var i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener('keydown', clickKeyboard);
  }
});

//call methods when something is changing
window.onchange = function() {
  commands();
}

window.onload = function() {
   var allInputs = document.querySelectorAll('input,[tabindex]:not([tabindex="-1"])');
  var lastInput = allInputs[allInputs.length - 1];

  lastInput.focus();
}

// window.onblur = function(){
//   save();
// }

//save all inputs
// function save() {
//   var allInputs = document.querySelectorAll('input,[tabindex]:not([tabindex="-1"])');
//   var Inp = ["Finish design of a homepage", "Try out the private beta"];

//   for (var i = 0, len = allInputs.length; i < len; i++){               
//     var val = allInputs[i].value;
//     if (val.trim().length != 0 ){
//       Inp.push(val);
//     }
//   }

//   //set icon
//   if (Inp.length > 0){
//     chrome.browserAction.setIcon({path : "x_icon_16.png" });
//   } else {
//     chrome.browserAction.setIcon({path : "icon_16.png" });
//   }

//   chrome.storage.sync.set({"keyy": Inp}, function(){console.log(Inp)});
// }

// //get all inputs
// window.onload = function() {
//   var container = document.getElementById("todo_list");
//   var firstInput = document.getElementsByClassName("last_input")[0];
//   try {
//     chrome.storage.sync.get({"keyy": []}, function(result) {
//       Inp = result.keyy;
//       console.log(result.keyy);

//     //set icon
//     if (Inp.length > 0){
//       chrome.browserAction.setIcon({path : "x_icon_16.png" });
//     } else {
//       chrome.browserAction.setIcon({path : "icon_16.png" });
//     }

//     for (var i = 0, len = Inp.length; i < len; i++) {
//       var newInput = document.createElement("INPUT");
//       newInput.setAttribute("value", Inp[i]);
//       newInput.classList.add("previous_input");
//       newInput.addEventListener('keydown', clickKeyboard);
//       container.insertBefore(newInput, firstInput); 
//     } 
//     createIn();
//   });
//   } catch (e) {
//     console.error(e);
//   }
// } 

//create element when creating a new element
function createIn() {
  var container = document.getElementById("todo_list");
  var newInput = document.createElement("INPUT");

  newInput.setAttribute("type", "text");
  newInput.setAttribute("placeholder", randomPlaceholder());
  newInput.classList.add("last_input");
  newInput.setAttribute("value", "");
  newInput.addEventListener('keydown', clickKeyboard);

  container.appendChild(newInput);
  
  newInput.focus();
}

//listen keyboard
function clickKeyboard() {
  var allInputs = document.querySelectorAll('input,[tabindex]:not([tabindex="-1"])');
  var firstInput = allInputs[0];
  var lastInput = allInputs[allInputs.length - 1];
  var textOfInput = lastInput.value;
  textOfInput.trim().replace(); 

  if (event.target.classList.contains("last_input") && event.key === "Enter" && textOfInput !== "" && textOfInput.trim().length !== 0){
    createIn();
    inputChangeClass();
  }

  if (event.key === "Enter" && event.target.classList.contains("previous_input")){
    event.target.blur();
  }

  if ((event.key === "Delete" || (event.key === "Backspace" && event.metaKey)) && !event.target.classList.contains("last_input")){
    deleteIn();
  }

  if ((event.key === "Delete" || (event.key === "Backspace" && event.metaKey)) && event.target.classList.contains("last_input")){
    event.target.blur();
  }

  if (event.key === "Escape") {
    save();
  }

  var b;
  var n =  Array.from(allInputs).indexOf(event.target);
  if (event.keyCode == 38) {
    if (n === 0) {
      b = allInputs.length - 1;
    }else{
     b = n-1;
   }

   allInputs[b].focus();

 }


 if (event.keyCode == 40) {
  if (n === allInputs.length - 1) {
    b = 0;
  }else{
   b = n+1;
 }

 allInputs[b].focus();

}
}

//change class when creating an element
function inputChangeClass() {
  var allInputs = document.querySelectorAll('input,[tabindex]:not([tabindex="-1"])');
  var theSecondOfLast = document.getElementsByTagName("INPUT")[allInputs.length - 2];

  if(document.createElement("INPUT")){
    theSecondOfLast.classList.remove("last_input");
    theSecondOfLast.classList.add("previous_input");
  }
}

//deleting an input
function deleteIn() {
  var allInputs = document.querySelectorAll('input,[tabindex]:not([tabindex="-1"])');
  var n =  Array.from(allInputs).indexOf(event.target);
  event.target.remove();
   
  allInputs[n+1].focus();
  allInputs[n+1].setSelectionRange(99999,99999);
}

//give a new placeholder
var sentences = ["you are amazing", "Focus only on what matters", "c:", "Just do it", "Great things starts with a small thing"];
function randomPlaceholder() {
  return sentences[Math.floor(Math.random() * sentences.length)];
}

function deleteInListenerOfCommands() {
  var allInputs = document.querySelectorAll('input,[tabindex]:not([tabindex="-1"])');
  var secondOfTheLastInput = allInputs[allInputs.length - 2];
  secondOfTheLastInput.remove();
}

function setDarkTheme(){
  document.getElementById('theme_css').href = 'done_dark.css';
  document.getElementById('logo').src = 'logo_black.png';
}

function setLightTheme(){
  document.getElementById('theme_css').href = 'done_light.css';
  document.getElementById('logo').src = 'logo_white.png';
}

function commands(){
  var dark = /set dark theme/i;
  var light = /set light theme/i;
  var lastInput = document.getElementsByClassName("last_input")[0];

  if (lastInput.value.match(dark)){ 
    setDarkTheme();
    deleteInListenerOfCommands();
  }

  if (lastInput.value.match(light)){ 
    setLightTheme();
    deleteInListenerOfCommands();
  }
}
// document.getElementById('buttonID').onclick = function () { 
    
// };