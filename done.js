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

  container.scrollTo(0,document.body.scrollHeight);
}

//listen keyboard
function clickKeyboard() {
  var allInputs = document.querySelectorAll('input,[tabindex]:not([tabindex="-1"])');
  var firstInput = allInputs[0];
  var lastInput = allInputs[allInputs.length - 1];
  var textOfInput = lastInput.value;
  textOfInput.trim().replace(); 
  var n =  Array.from(allInputs).indexOf(event.target);
  if (event.target.classList.contains("last_input") && event.key === "Enter" && textOfInput !== "" && textOfInput.trim().length !== 0){
    createIn();
    inputChangeClass();
  }

  if (event.key === "Enter" && event.target.classList.contains("previous_input")){
    event.target.blur();
  }

  if ((event.key === "Backspace" && event.metaKey) && !event.target.classList.contains("last_input")){
    deleteIn();
  }
  
  if (event.key === "Delete"  && !event.target.classList.contains("last_input")) {
      deleteIn();
      allInputs[n+1].setSelectionRange(99999,99999);
    }
    

  if ((event.key === "Delete" || (event.key === "Backspace" && event.metaKey)) && event.target.classList.contains("last_input")){
    event.target.blur();
  }

  if (event.key === "Escape") {
    save();
  }

  var b;
  
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
  // allInputs[n+1].setSelectionRange(99999,99999);
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
  document.getElementById('changed_input').value = 'Type “set light theme” to change dark theme to light';
}

function setLightTheme(){
  document.getElementById('theme_css').href = 'done_light.css';
  document.getElementById('logo').src = 'logo_white.png';
   document.getElementById('changed_input').value = 'Type “set dark theme” to change light theme to dark';
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