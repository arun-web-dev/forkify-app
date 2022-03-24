//imports model
import * as model from './model'; 

//imports Views
import receipeView from './views/receipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';

import paginationView from './views/paginationView';
import 'core-js/stable';
import 'regenerator-runtime';

// if (module.hot) {
//   module.hot.accept();
// }
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
    receipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get Search Query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    //3)Render results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render Initial Pagiantion buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //2)update pagination
  paginationView.render(model.state.search);
};

const init = function () {
  receipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
