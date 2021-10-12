import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

import { async } from 'regenerator-runtime';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

export async function loadRecipe(id) {
  try {
    const data = await getJSON(`${API_URL}get?rId=${id}`);

    // reformating the obj we got from the server
    const { recipe } = data.data;
    return (state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    });
  } catch (err) {
    throw err;
  }
}

export async function loadSearchResults(query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}search?q=${query}`);

    state.search.results = data.recipes.map(recipe => {
      return {
        id: recipe.recipe_id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {
    console.error(`${err.message}`);
    throw err;
  }
}
