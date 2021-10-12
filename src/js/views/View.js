import icons from 'url:../../img/icons.svg';

export default class View {
  //#region Fields
  _data;
  //#endregion

  //#region Methods
  _clear() {
    this._parentElement.innerHTML = '';
  }

  render(data) {
    this._data = data;
    const html = this._generateHTML();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
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
