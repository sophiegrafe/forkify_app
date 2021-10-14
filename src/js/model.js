import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

import 'regenerator-runtime/runtime';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export async function loadRecipe(id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
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
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
}

export function getSearchResultsPage(page = state.search.page) {
  state.search.page = page;

  const { resultsPerPage } = state.search;
  const end = page * resultsPerPage;
  const start = end - resultsPerPage;

  return state.search.results.slice(start, end);
}
