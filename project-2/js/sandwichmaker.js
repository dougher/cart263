// This is the javascript file for the "sandwich creation" aspect of the experience,
// which is mostly working with arrays, objects, switches and loops.

"use strict";

let CURRENT_ROUND_BREAD = 4;
let CURRENT_ROUND_MEAT = 4;
let CURRENT_ROUND_CHEESE = 2;
let CURRENT_ROUND_VEGETABLE = 3;
let CURRENT_ROUND_LEAF = 1;
let CURRENT_ROUND_ROOT = 1;

let CURRENT_ROUND_BIZARROWRAPPER = 0;
let CURRENT_ROUND_BIZARROMEAT = 0;
let CURRENT_ROUND_BIZARROFOOD = 0;

let ORIGINAL_WRAPPER_SIZE = 0;
let ORIGINAL_MAIN_SIZE = 0;
let ORIGINAL_STUFFING_SIZE = 0;

let wrapper = [];
let main = [];
let stuffing = [];

let foods;
let bizarro;

let sandwich = {
  wrapper: "",
  main: [],
  stuffing: []
};

//Sends new words from each array depending on which stage we are (pre- or post-bizarro).
function setCurrentStage(){
  if (round <= 3){
    setArrays("bread");
    setArrays("meat");
    setArrays("cheese");
    setArrays("leaf");
    setArrays("vegetable");
    setArrays("root");
  } else {
    // Where shit gets weird.
    console.log("in bizarro mode.");
    if (round <= 5){
      setArrays("root");
    }


    setArrays("bizarroWrapper");
    setArrays("bizarroMeat");
    setArrays("bizarroFood");

    RemoveRandomOriginal();
  }
}

// This function is called every "round" to set the arrays. We add the new round of
// words to a given array of choice, from which the user picks.
function setArrays(current){
  let numberOfLoops;
  let currentArray = -1; // Represents the current category (wrapper, main, stuffing, etc.)
  let currentDictionary= -1; // Represents the current family of words (bread, leafs, vegetables, roots, etc.)

  // We first check which current array we are working with and set the corresponding
  // variables in consequence.
  switch (current){
    case "bread":
      numberOfLoops = CURRENT_ROUND_BREAD;
      currentArray = 0;
      currentDictionary = 0;
      break;
    case "meat":
      numberOfLoops = CURRENT_ROUND_MEAT;
      currentArray = 1;
      currentDictionary = 1;
      break;
    case "cheese":
      numberOfLoops = CURRENT_ROUND_CHEESE;
      currentArray = 1;
      currentDictionary = 2;
      break;
    case "leaf":
      numberOfLoops = CURRENT_ROUND_LEAF;
      currentArray = 2;
      currentDictionary = 3;
      break;
    case "vegetable":
      numberOfLoops = CURRENT_ROUND_VEGETABLE;
      currentArray = 2;
      currentDictionary = 4;
      break;
    case "root":
      numberOfLoops = CURRENT_ROUND_ROOT;
      currentArray = 2;
      currentDictionary = 5;
      break;
    case "bizarroWrapper":
      numberOfLoops = CURRENT_ROUND_BIZARROWRAPPER;
      currentArray = 0;
      currentDictionary = 0;
      break;
    case "bizarroMeat":
      numberOfLoops = CURRENT_ROUND_BIZARROMEAT;
      currentArray = 1;
      currentDictionary = 1;
      break;
    case "bizarroFood":
      numberOfLoops = CURRENT_ROUND_BIZARROFOOD;
      currentArray = 2;
      currentDictionary = 2;
      break;
  }

  // Once that's done, we can cycle through the category's current number of
  // elements to add and add them to the given array of choices.
  // The currentDictionary tells use which food group to choose from and the currentArray
  // tells us in which array of choice to put it in. (E.g. the leaf, vegetable and root dictionaries
  // all go in the stuffing array).
  for (let i=0; i<numberOfLoops; i++){
    let str;

    // If we are at 3 round or less, we pick from the normal food object.
    // If we are more than three but that the current dictionary is still not empty, the
    // condition is true. Should only happen with the "roots" family.
    if (round <= 3 || foods.content[currentDictionary].length > 0){
      switch(currentArray){
        case 0:
          str = foods.content[currentDictionary].slice(i, i+1);
          wrapper.push(str);
          break;
        case 1:
          str = foods.content[currentDictionary].slice(i, i+1);
          main.push(str);
          break;
        case 2:
          str = foods.content[currentDictionary].slice(i, i+1);
          stuffing.push(str);
          break;
      }

      // We finally remove the elements just added to the choice arrays to avoid duplicates.

    } else { // Otherwise, we pick from the bizarro options instead.
      switch(currentArray){
        case 0:
          str = bizarro.content[currentDictionary].slice(i, i+1);
          wrapper.push(str);
          break;
        case 1:
          str = bizarro.content[currentDictionary].slice(i, i+1);
          main.push(str);
          break;
        case 2:
          str = bizarro.content[currentDictionary].slice(i, i+1);
          stuffing.push(str);
          break;
      }
      // We finally remove the elements just added to the choice arrays to avoid duplicates.

    }

  }

  if (round <= 3 || foods.content[currentDictionary].length > 0)
    foods.content[currentDictionary].splice(0, numberOfLoops);
  else
    bizarro.content[currentDictionary].splice(0, numberOfLoops);

} // End of setArrays function.

// This function is called whenever we are in a category which accepts more
// than one option.
function addToCategory(currentArray, choice){
  for (let i=0; i<currentArray.length;i++){
    if (choice === currentArray[i]){
      if (currentElement === "main")
        sandwich.main.push(choice);
      else if (currentElement === "stuffing")
        sandwich.stuffing.push(choice);
    }
  }

  if (currentArray.length === 0){
    invalid();
  } else {
    anythingElse();
    if (!skipVisible){
      createSkipButton();
      skipVisible = true;
    }

  }
}

// Once the user is done or skips, we call this fucntion to change the currentElement
// to the next one. Once it is the last category, we call the verification function which
// lists the order.
function setNextCategory(){
  if (skipVisible){
    skipVisible = false;
    deleteButtons(true); // Delete specifically the skip button thanks to the "true" boolean sent.
  }


  switch (currentElement){
    case "wrapper":
      currentElement = "main";
      createCurrentButtons(main);
      console.log(main);
      break;
    case "main":
      currentElement = "stuffing";
      createCurrentButtons(stuffing);
      console.log(stuffing);
      break;
    case "stuffing":
      currentElement = "none";
      break;
    case "none":
      checkout = true;

      deleteButtons(false); // We first delete the buttons that are already there. The false
      // boolean ensures we take care of choice-related buttons.

      verification();
      break;
    default:
      // If we're here, it is the first time this function is called. We thus set currentElement
      // for the first time.
      currentElement = "wrapper";
      createCurrentButtons(wrapper);
      break;
  }

  // After setting the currentElement, we say the corresponding sentence (which can also be heard through the "repeat" vocal command)
  if (currentElement != "none"){
    repeat();
  }
}

function RemoveRandomOriginal(bizarro){
  if (round > 7){
    if (ORIGINAL_WRAPPER_SIZE > 1){
      wrapper.splice(Math.floor(Math.random() * ORIGINAL_WRAPPER_SIZE), 1);
      ORIGINAL_WRAPPER_SIZE--;
    }

    if (ORIGINAL_MAIN_SIZE > 1){
      main.splice(Math.floor(Math.random() * ORIGINAL_WRAPPER_SIZE), 2);
      ORIGINAL_MAIN_SIZE--;
    }

    if (ORIGINAL_STUFFING_SIZE > 1){
      stuffing.splice(Math.floor(Math.random() * ORIGINAL_WRAPPER_SIZE), 2);
      ORIGINAL_STUFFING_SIZE--;
    }
  } else {
      wrapper.splice(Math.floor(Math.random() * ORIGINAL_WRAPPER_SIZE), 1);
      ORIGINAL_WRAPPER_SIZE--;

      main.splice(Math.floor(Math.random() * ORIGINAL_WRAPPER_SIZE), 2);
      ORIGINAL_MAIN_SIZE--;

      stuffing.splice(Math.floor(Math.random() * ORIGINAL_WRAPPER_SIZE), 2);
      ORIGINAL_STUFFING_SIZE--;
  }
}
