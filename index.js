// Import stylesheets
import './style.css';
let wordList = require("./wordlist.js");
const testList = wordList;
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

// var wordList1 = wordList;
// var letters2 = letters;
// var grays2 = grays;
// var yellows2 = yellows;
// var yelpos2 = yelpos; 
// var greens2 = greens;
// var grnpos2 = grnpos;

var extraDebug = false;

var wordLength = 5;

var test = false;
//FInd the average amount of guesses to get a certain right answer for each word

function solveWord(list) {
    lValues = new Array();
    wValues = new Array();
    letters.forEach(addEmptyL);
    list.forEach(LetterValues);
    //console.log(lValues);
    list.forEach(addEmptyW);
    //console.log(wValues);
    list.forEach(WordValues);
    //console.log(wValues);

    var largest = 0;
    var bestWords = new Array();
    for(var i = 0; i < list.length; i++){
      if(largest < wValues[i]){
        largest = wValues[i];
      }
    }
    for(var i = 0; i < list.length; i++){
      if(wValues[i] == largest){
        bestWords.push(list[i]);
      }
    }
    return bestWords;
}

var button = document.querySelector('button');
button.onclick = function() {
  if(document.getElementById("wordInput").value.length == 5 && document.getElementById("resultInput").value.length == 5){
    sort(document.getElementById("wordInput").value, document.getElementById("resultInput").value, grays, yellows, yelpos, greens, grnpos, letters);
    console.log("word list length: " + wordList.length);
    if(wordList.length < 50){
      //extraDebug = true;
    }
    wordList = wordList.filter(cleanList);

    
    document.getElementById("p1").innerHTML = solveWord(wordList);
    document.getElementById("wordInput").value = solveWord(wordList);
    console.log(wordList.length);
    if(wordList.length <= 25){
      document.getElementById("p1").innerHTML = solveRemainingWords()[0];
    }
  }
}

var extraSolve = function(){
  var listOfGuesses = new Array();
  var listOfGuessesWords = new Array();
  for(var i = 0; i < wordList.length; i++){
    listOfGuesses.push(0);
    listOfGuessesWords.push(wordList[i]);
  }
  console.log(listOfGuessesWords);
  answerLoop:
  for(var i = 0; i < wordList.length; i++){
    var answer = wordList[i];
    firstGuessLoop:
    for(var j = 0; j < wordList.length; j++){
      wordList1 = wordList;
      letters2 = letters;
      grays2 = grays;
      yellows2 = yellows;
      yelpos2 = yelpos; 
      greens2 = greens;
      grnpos2 = grnpos;
      solveLoop:
      for(var k = 0; k < 10; k++){
        if(k == 0){guess = wordList[j];}
        sort(guess, checkWord(guess, answer), grays2, yellows2, yelpos2, greens2, grnpos2, letters2);
        wordList1 = wordList1.filter(cleanList);
        var guess = solveWord(wordList1)[0];
        listOfGuesses[j] = listOfGuesses[j] + 1;
        console.log(answer + " " + wordList[j] + " " + guess)
        if(guess == answer){console.log("SOLVED"); break solveLoop;}
      }
    }
  }
  console.log(listOfGuesses);
  console.log(listOfGuessesWords);
  var bestGuessWords = new Array();
  for(var i = 0; i < listOfGuesses; i++){
    if(listOfGuesses[i] <= Math.min(listOfGuesses) ){
      bestGuessWords.push(listOfGuessesWords[i]);
    }
  }
  return bestGuessWords;
}

var solveRemainingWords = function(){
  //Sort changes example which changes random bc they are equal which changes grays bc they are equal;
  const oldgrays = newArray(grays);
  const oldyellows = newArray(yellows);
  const oldyelpos = newArray(yelpos);
  const oldgreens = newArray(greens);
  const oldgrnpos = newArray(grnpos);
  const oldletters = newArray(letters);
  var wordsLeft = new Array();
  var wordsLeftWord = new Array();
  for(var i = 0; i < wordList.length; i++){
    wordsLeft.push(0);
    wordsLeftWord.push(wordList[i]);
  }
  for(var i = 0; i < wordList.length; i++){
    var answer = wordList[i];
    for(var j = 0; j < wordList.length; j++){
      var wordList2 = new Array();
      grays = newArray(oldgrays);
      yellows = newArray(oldyellows);
      yelpos = newArray(oldyelpos);
      greens = newArray(oldgreens);
      grnpos = newArray(oldgrnpos);
      letters = newArray(oldletters);
      var guess = wordList[j];
      //console.log(guess, answer);
      sort(guess, checkWord(guess, answer));
      wordList2 = wordList.filter(cleanList);
      //console.log(i*j);
      //console.log(wordList);
      //console.log(wordList[j]);
      //console.log(wordList2);
      //console.log(wordList.filter(cleanList));
      //console.log("A: " + answer + "G: " + guess + "O: " + checkWord(guess, answer));
      //console.log(wordList2);
      //console.log(wordList2.length);
      wordsLeft[j] = (wordsLeft[j] + wordList2.length);
      //console.log("length"+ wordList1.length);
      //console.log(parseInt(wordsLeft[j]) + parseInt(wordList1.length));
    }
  }
  //console.log(wordsLeftWord);
  //console.log(wordsLeft);
  //console.log(wordsLeft);
  var smallest = 100;
  for(var i = 0; i < wordsLeft.length; i++){
    if(smallest > wordsLeft[i]){
      smallest = wordsLeft[i];
    }
  }
  //console.log(smallest);
  var out = new Array();
  for(var k = 0; k < wordsLeft.length; k++){
    if(wordsLeft[k] <= smallest){
      //console.log("word: " + wordsLeftWord[i] + "avg words: " + wordsLeft[k]);
      out.push(wordsLeftWord[k]);
    }
  }
  //console.log(out);
  grays = newArray(oldgrays);
  yellows = newArray(oldyellows);
  yelpos = newArray(oldyelpos);
  greens = newArray(oldgreens);
  grnpos = newArray(oldgrnpos);
  letters = newArray(oldletters);
  return out;
}

function checkWord(guess, answer){
  var a = Array.from(answer);
  var g = Array.from(guess);
  //console.log(a, g);
  var out = "";
  for(var k = 0; k < 5; k++){
    //console.log(a[k], g[k]);
    if(g[k] == a[k]){
      out += "g";
    }
    else if(a.indexOf(g[k]) != -1){
      out += "y";
    }
    else {
      out += "x";
    }
  }
  return out;
}

var firstButton = document.getElementById("first");
firstButton.onclick = function() {
  document.getElementById("p1").innerHTML = solveWord(wordList);
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
  //console.log(yelpos);
}

function cleanList(word){
  // var grays;
  // var yellows;
  // var yelpos;
  // var greens;
  // var grnpos;
  // grays = grays;
  // yellows = yellows;
  // yelpos = yelpos;
  // greens = greens;
  // grnpos = grnpos;
  // if(test == true){
  //   grays = grays;
  //   yellows = yellows;
  //   yelpos = yelpos;
  //   greens = greens;
  //   grnpos = grnpos;
  // }
  // else if(wordList.length <= 25){
  //   grays = grays2;
  //   yellows = yellows2;
  //   yelpos = yelpos2;
  //   greens = greens2;
  //   grnpos = grnpos2;
  // }
  // else{

  // }
  //Grays
  for(var i = 0; i < grays.length; i++){
    if(word.includes(grays[i])){
      debug(word, "contained grays");
      return false;
    }
  }
  //Greens
  for(var i = 0; i < greens.length; i++){
    if(Array.from(word)[grnpos[i]] != greens[i]){
      debug(word, "didnt contain green in correct spot");
      return false;
    }
  }

  //Yellows
  for(var i = 0; i < yellows.length; i++){
    //console.log("y");
    if(word.includes(yellows[i])){
      debugX(word, "contains yellow");
      for(var i1 = 0; i1 < yelpos[i].length; i1++){
        if(Array.from(word)[(yelpos[i][i1])] == yellows[i] ){
          debug(word, "contained yellow: " + yellows[i] + " in spot" + (yelpos[i][i1] + 1));
          return false;
        }
      }
      debugX(word, "did not contain yellow: " + yellows[i] + " in spots: " + yelpos[i]);
    }
    else if(yellows.length > 0){
      debug(word, "didnt contain yellow");
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

function newArray(array){
  var out = new Array();
  for(var i = 0; i < array.length; i++){
    out.push(array[i]);
  }
  return out;
}

function debugX(word, message){
  if(extraDebug == true){
    console.log(word + " " + message);
  }
}

function debug(word, reason){
  if(extraDebug == true){
    console.log("removed word: " + word + ", reason: " + reason);
  }
}

var testButton = document.getElementById("TestButton");
testButton.onclick = function() {
  test = true;
  var totalGuess = 0;
  var totalWords = testList.length;
  var failures = 0;
  console.log(totalWords);

  var avgGuess = 0;
  for(var i = 0; i < 2; i++){
    var answer = testList[i];
    console.log(answer);
    //document.getElementById("p1").innerHTML = i + "/" + totalWords;
    wordList = require("./wordlist.js");
    letters = Array.from("abcdefghijklmnopqrstuvwxyz");
    grays = new Array();
    yellows = new Array();
    yelpos = new Array(); 
    greens = new Array();
    grnpos = new Array();
    var guess = solveWord(wordList)[0];
    for(var j = 0; j < 8; j++){
      //console.log("grays1: " + grays);
      sort(guess, checkWord(guess, answer));
      //console.log("grays: " + grays);
      console.log(answer + "," + guess);
      wordList = wordList.filter(cleanList);
      totalGuess++;
      if(j == 7){failures++;}
      if(guess == answer){break;}
      if(wordList.length <= 25){
        guess = solveRemainingWords()[0];
      }
      //console.log(wordListTest);
      //console.log(guess + "A: " + answer);
      //console.log("grays3: " + grays);
    }
    //console.log(i + "/" + totalWords);
    avgGuess++;
  }
  avgGuess = totalGuess/avgGuess;
  document.getElementById("p1").innerHTML = "Average guesses: " + (avgGuess) + ", Total failures: " + failures;
}

//usage: