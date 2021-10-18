import icons from 'url:../../img/icons.svg';

export default class View {
  //#region fields
  _data;
  //#endregion

  //#region methods
  //protected
  _clear() {
    this._parentElement.innerHTML = '';
  }

  //public
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const html = this._generateHTML();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
    console.log(data);
  }

  update(data) {
    this._data = data;
    const newHtml = this._generateHTML();

    const newDOM = document.createRange().createContextualFragment(newHtml);

    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      //update the text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild.nodeValue.trim() !== curEl.firstChild.nodeValue.trim()
      ) {
        curEl.textContent = newEl.textContent;
      }

      //update the attributes
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  renderSpinner() {
    const html = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>  
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  renderError(message = this._errorMessage) {
    const html = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  renderNotification(message = this._notification) {
    const html = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear(this._parentElement);
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
  //#endregion
}
