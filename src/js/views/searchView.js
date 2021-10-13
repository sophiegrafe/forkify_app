class SearchView {
  //#region fields
  _parentElement = document.querySelector('.search');
  //#endregion

  //#region methods
  //protected
  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  //pubic
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  //handler
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      //
      e.preventDefault();
      handler();
    });
  }
  //#endregion
}

export default new SearchView();
