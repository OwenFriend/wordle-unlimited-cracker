// Import stylesheets
import './style.css';
let wordList = require("./wordlist.js");
//document.getElementById("p1").innerHTML = wordList;

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

var lValues = new Array();
var wValues = new Array();

var letters = Array.from("abcdefghijklmnopqrstuvwxyz");
var grays = new Array();
var yellows = new Array();
var yelpos = new Array();
var greens = new Array();
var grnpos = new Array();

var extraDebug = false;

var wordLength = 5;

function solveWord() {
    lValues = new Array();
    wValues = new Array();
    letters.forEach(addEmptyL);
    wordList.forEach(LetterValues);
    console.log(lValues);
    wordList.forEach(addEmptyW);
    console.log(wValues);
    wordList.forEach(WordValues);
    console.log(wValues);

    var largest = 0;
    var bestWords = new Array();
    for(var i = 0; i < wordList.length; i++){
      if(largest < wValues[i]){
        largest = wValues[i];
      }
    }
    for(var i = 0; i < wordList.length; i++){
      if(wValues[i] == largest){
        bestWords.push(wordList[i]);
      }
    }
    return bestWords;
}

var button = document.querySelector('button');
button.onclick = function() {
  if(document.getElementById("wordInput").value.length == 5 && document.getElementById("resultInput").value.length == 5){
    sort(document.getElementById("wordInput").value, document.getElementById("resultInput").value);
    console.log("word list length: " + wordList.length);
    if(wordList.length < 50){
      extraDebug = true;
    }
    wordList = wordList.filter(cleanList);

    
    document.getElementById("p1").innerHTML = bestWords;
  }
}

var firstButton = document.getElementById("first");
firstButton.onclick = function() {
  document.getElementById("p1").innerHTML = solveWord();
}

var normButton = document.getElementById("normal");
normButton.onclick = function() {
  wordList = require("./wordlist.js");
  letters = Array.from("abcdefghijklmnopqrstuvwxyz");
  grays = new Array();
  yellows = new Array();
  yelpos = new Array(); 
  greens = new Array();
  grnpos = new Array();
}

var unButton = document.getElementById("unlimited");
unButton.onclick = function() {
  letters = Array.from("abcdefghijklmnopqrstuvwxyz");
  grays = new Array();
  yellows = new Array();
  yelpos = new Array(); 
  greens = new Array();
  grnpos = new Array();
  document.getElementById("p1").innerHTML = "trying unlimited...";
  wordLength = document.getElementById("unlength").value;
  let unList = require("./unlimitedwordlist.js");
  console.log("filter");
  wordList = unList.filter(filterByLength);
  console.log("filtered to: " + wordLength);
  document.getElementById("p1").innerHTML = "unlimited";
}

function filterByLength(word){
  if(word.length != wordLength){
    return false;
  }
  return true;
}

function sort(word, result){
  var res = Array.from(result);
  var wrd = Array.from(word);
  for(var i = 0; i < 5; i++){
    //Grays
    if(res[i] == "x"){
      if(grays.indexOf(word[i]) == -1){
        grays.push(wrd[i]);
        letters.splice(letters.indexOf(wrd[i]), 1);
      }
    }
    //Yellows
    if(res[i] == "y"){
      if(yellows.indexOf(wrd[i]) == -1){
        yellows.push(wrd[i]);
        //console.log(i);
        yelpos.push([i]);
      }
      else {
        (yelpos[yellows.indexOf(wrd[i])]).push(i);
      }
    }
    //Greens
    if(res[i] == "g"){
      if(grnpos.indexOf(i) == -1){
        greens.push(wrd[i]);
        grnpos.push(i);
      }
      for(var i1 = 0; i1 < yellows.length; i1++){
        if(greens[greens.length-1] == yellows[i]){
          yellows.splice(i1, 1);
          yelpos.splice(i1, 1);
        }
      }
      for(var i1 = 0; i1 < yellows.length; i1++){
        for(var i2 = 0; i2 < yelpos[i1].length; i2++){
          if(grnpos[grnpos.length-1] == (yelpos[i1])[i2]){
            //console.log("removed yellow: " + yellows[i1]);
            //yelpos[i1].splice(i2, 1);
          }
        }
      }
    }
  }
  console.log(grays);
  console.log(yellows);
  console.log(yelpos[0]);
  console.log(yelpos[1]);
  console.log(greens);
  console.log(letters);
}

function cleanList(word){
  //Grays
  for(var i = 0; i < grays.length; i++){
    if(word.includes(grays[i])){
      if(extraDebug == true){
        debug(word, "contained grays");
      }

      return false;
    }
  }
  //Greens
  for(var i = 0; i < greens.length; i++){
    if(Array.from(word)[grnpos[i]] != greens[i]){
      if(extraDebug == true){
        debug(word, "didnt contain green in correct spot");
      }

      return false;
    }
  }

  //Yellows
  for(var i = 0; i < yellows.length; i++){
    //console.log("y");
    if(word.includes(yellows[i])){
      for(var i1 = 0; i1 < yelpos[i].length; i1++){
        if(Array.from(word)[(yelpos[i])] == yellows[i] ){
          if(extraDebug == true){
            debug(word, "yellow was in wrong spot");
          }

          return false;
        }
      }
    }
    else if(yellows.length > 0){
      if(extraDebug == true){
      debug(word, "didnt contain yellow");
        
      }
      return false;
    }
  }
  return true;
}

function LetterValues(word){

  for(var i = 0; i < letters.length; i++){
    if(word.includes(letters[i])){
      lValues[i] += 1;
    }
  }
}

function WordValues(word){
  var pos = wordList.indexOf(word);
  for(var i = 0; i < letters.length; i++){
    if(word.includes(letters[i])){
      wValues[pos] = wValues[pos] + lValues[i];
    }
  }
}

function addEmptyL(){
  lValues.push(0);
}

function addEmptyW(){
  wValues.push(0);
}

function debug(word, reason){
  console.log("removed word: " + word + ", reason: " + reason);
}

//usage: