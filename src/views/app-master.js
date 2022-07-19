import { LitElement, html, css } from 'lit';
import { MasterViewModel } from '../viewmodels/master.js';
import { LIGHT, DARK } from '../types.js';

import '../components/app-link.js';

export class Master extends LitElement {
  static get properties() {
    return {
      viewState: {},
      viewModel: {},
    };
  }

  static get styles() {
    return css`
      .container {
        text-align: center;
      }
      .error {
        color: red;
      }
      .busy {
        width: 5rem;
        height: 5rem;
        text-align: center;
      }
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.viewModel = await new MasterViewModel().initialize();
    this.viewModel.notifier.subscribe(newViewModel => {
      this.viewModel = newViewModel;
      this.requestUpdate('viewModel');
    });
  }

  willUpdate(changedProperties) {
    if (changedProperties.has('viewModel')) {
      const backgroundColor =
        this.viewModel.appState.lightMode === LIGHT ? LIGHT : DARK;
      const textColor =
        this.viewModel.appState.lightMode === LIGHT ? DARK : LIGHT;

      this.viewState = {
        ...this.viewState,
        records: this.viewModel.records,
        error: this.viewModel.error,
        errorMessage: this.viewModel.error
          ? this.viewModel.errorState.message
          : undefined,
        errorCode: this.viewModel.error
          ? this.viewModel.errorState.code
          : undefined,
        busy: this.viewModel.busy,
        lightModeStyle: `background-color: ${backgroundColor}; color: ${textColor}`,
        toggleError: this.viewModel.toggleError.bind(this.viewModel),
        toggleBusy: this.viewModel.toggleBusy.bind(this.viewModel),
      };
    }
  }

  render() {
    if (this.viewState) {
      return html`
        <div style=${this.viewState.lightModeStyle} class="container">
          ${this.viewState.error
            ? html`<div class="error">
                Error code ${this.viewState.errorCode}:
                ${this.viewState.errorMessage}
              </div>`
            : html`
                <h2>Customers Master Page</h2>
                ${this.viewState.busy
                  ? html`<div>
                      <img src="busy.gif" alt="busy" width="300" height="300" />
                    </div>`
                  : html`<ul>
                      ${this.viewState.records.map(
                        item =>
                          html`<div>
                            <app-link href="/detail/${item.id}"
                              >${item.name}</app-link
                            >
                          </div>`
                      )}
                    </ul>`}
                <div>
                  <button @click=${this.viewState.toggleBusy}>
                    Toggle Busy State
                  </button>
                </div>
              `}
          <div>
            <button @click=${this.viewState.toggleError}>
              Toggle Error State
            </button>
          </div>
        </div>
      `;
    }

    return html``;
  }
}

customElements.define('app-master', Master);
