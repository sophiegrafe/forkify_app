import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import { async } from 'regenerator-runtime';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
///////////////////////////////////////
// if (module.hot) {
//   module.hot.accept();
// }

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
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    resultsView.render(model.state.search.results);
  } catch (err) {
    recipeView.renderError();
  }
}

function initSubscribers() {
  recipeView.addHandlerRender(recipesController);
  searchView.addHandlerSearch(searchController);
}
initSubscribers();
