import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

import { async } from 'regenerator-runtime';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
///////////////////////////////////////

async function recipeController() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // loading recipe
    await model.loadRecipe(id);
    recipeView.renderSpinner();
    // rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
}

async function searchController() {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
  } catch (err) {
    recipeView.renderError();
  }
}

function initSubscribers() {
  recipeView.addHandlerRender(recipeController);
  searchView.addHandlerSearch(searchController);
}

initSubscribers();
