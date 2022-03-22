//imports model
import * as model from './model';

//imports Views
import receipeView from './views/receipeView';
const recipeContainer = document.querySelector('.recipe');

import 'core-js/stable';
import 'regenerator-runtime';

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

const init = function () {
  receipeView.addHandlerRender(controlRecipe);
};

init();
