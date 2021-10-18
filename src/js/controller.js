import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
///////////////////////////////////////

async function recipesController() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // loading recipe
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    // rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.log(err);
  }
}

async function searchController() {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();
    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    recipeView.renderError();
    console.log(err);
  }
}

function paginationController(goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
}

function servingsController(nrbServings) {
  model.updateServings(nrbServings);
  recipeView.update(model.state.recipe);
}

//initializing subscribers with IIFE
(function () {
  recipeView.addHandlerRender(recipesController);
  recipeView.addHandlerUpdateServings(servingsController);
  searchView.addHandlerSearch(searchController);
  paginationView.addHandlerClickBtn(paginationController);
})();
