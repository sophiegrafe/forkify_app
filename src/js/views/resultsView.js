import View from './View';
import { icons } from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage =
    'We could not found recipes for your query! Please try again.';
  _notification = '';

  _generateHTML() {
    return this._data.map(prev => this._generateHTMLPreview(prev)).join('');
  }

  _generateHTMLPreview(preview) {
    return `
    <li class="preview">
      <a class="preview__link" href="#${preview.id}">
        <figure class="preview__fig">
          <img crossorigin="anonymous" src="${preview.image}" alt="${preview.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${preview.title}</h4>
          <p class="preview__publisher">${preview.publisher}</p>            
        </div>
      </a>
    </li>
    `;
  }
}

export default new ResultsView();
