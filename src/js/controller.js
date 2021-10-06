import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

///////////////////////////////////////

async function recipeController() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // loading recipe
    await model.loadRecipe(id);

    // rendering recipe
    recipeView.render(recipe);
  } catch (err) {
    console.error(err);
  }
}
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, recipeController)
);
