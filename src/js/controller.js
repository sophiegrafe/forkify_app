import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

///////////////////////////////////////

async function recipeController() {
  try {
    recipeView.renderSpinner();

    const id = window.location.hash.slice(1);
    if (!id) return;
    // loading recipe
    await model.loadRecipe(id);
    // rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
}

function initSubscriber() {
  recipeView.addHandlerRender(recipeController);
}

initSubscriber();
