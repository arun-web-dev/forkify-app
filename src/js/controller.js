//imports model
import * as model from './model';

//imports Views
import receipeView from './views/receipeView';
const recipeContainer = document.querySelector('.recipe');

import 'core-js/stable';
import 'regenerator-runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// API key = 0b5c17dc-1a0d-4276-aaee-4e3ca8f6ee89

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    receipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    //2) Rendering recipe
    receipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipe)
);
