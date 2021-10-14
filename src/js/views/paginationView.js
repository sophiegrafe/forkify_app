import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  //#region fields
  _parentElement = document.querySelector('.pagination');
  //#endregion

  //#region methods
  //protected
  _generateHTML() {
    const currentPage = this._data.page;
    const nbrPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (currentPage === 1 && nbrPages > 1) return this._renderNextBtn();
    if (currentPage === nbrPages && nbrPages > 1) return this._renderPrevBtn();
    if (currentPage < nbrPages)
      return this._renderPrevBtn() + this._renderNextBtn();
  }

  _renderPrevBtn() {
    return `
      <button data-goto="${
        this._data.page - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
      </button>
      `;
  }
  _renderNextBtn() {
    return `
        <button data-goto="${
          this._data.page + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${this._data.page + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
  }

  //handler
  addHandlerClickBtn(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }
  //#endregion
}

export default new PaginationView();
