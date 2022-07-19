import { LitElement, html, css } from 'lit';
import { DetailViewModel } from '../viewmodels/detail.js';
import { LIGHT, DARK } from '../types.js';

import '../components/app-link.js';

export class Detail extends LitElement {
  static get properties() {
    return {
      viewState: {},
      viewModel: {},
      id: {},
    };
  }

  static get styles() {
    return css`
      .container {
        text-align: center;
      }
      .record {
        margin: 1rem;
      }
      .light-mode {
        margin: 1rem;
      }
      .table {
        margin-left: auto;
        margin-right: auto;
        width: 50rem;

        th {
          width: 10rem;
          text-align: right;
          padding: 0.5em;
        }

        td {
          width: 10rem;
          text-align: left;
          padding: 0.5rem;
        }
      }
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.viewModel = await new DetailViewModel().initialize(this.id);
    this.viewModel.notifier.subscribe(newViewModel => {
      this.viewModel = newViewModel;

      // This appears to be necessary - willUpdate does not fire unless requestUpdate() called.
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
        record: this.viewModel.record,
        appState: this.viewModel.appState,
        lightModeStyle: `background-color: ${backgroundColor}; color: ${textColor}`,
        toggleLightDark: this.viewModel.toggleLightDark.bind(this.viewModel),
        toggleMailFlag: this.viewModel.toggleMailFlag.bind(this.viewModel),
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
                <div style=${this.viewState.lightModeStyle} class="container">
                  <h1>
                    Detail Page for ${this.viewState.record.firstname}
                    ${this.viewState.record.surname}
                  </h1>
                  <div>
                    <app-link href="/">Back to Master page</app-link>
                  </div>
                  <div class="light-mode">
                    <button @click=${this.viewState.toggleLightDark}>
                      Toggle Light and Dark Mode
                    </button>
                  </div>

                  <div class="record">
                    <table class="table">
                      <tr>
                        <th>Title</th>
                        <td>${this.viewState.record.title}</td>
                      </tr>
                      <tr>
                        <th>First Name</th>
                        <td>${this.viewState.record.firstname}</td>
                      </tr>
                      <tr>
                        <th>Surname</th>
                        <td>${this.viewState.record.surname}</td>
                      </tr>
                      <tr>
                        <th>Address 1</th>
                        <td>${this.viewState.record.address1}</td>
                      </tr>
                      <tr>
                        <th>Address 2</th>
                        <td>${this.viewState.record.address2}</td>
                      </tr>
                      <tr>
                        <th>Postcode</th>
                        <td>${this.viewState.record.postcode}</td>
                      </tr>
                      <tr>
                        <th>Telephone</th>
                        <td>${this.viewState.record.telephone}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>${this.viewState.record.email}</td>
                      </tr>
                      <tr>
                        <th>Mail</th>
                        <td>${this.viewState.record.mail}</td>
                      </tr>
                      <tr>
                        <th>Age</th>
                        <td>${this.viewState.record.age}</td>
                      </tr>
                    </table>
                  </div>
                  <div>
                    <button @click=${this.viewState.toggleMailFlag}>
                      Toggle Mail Flag
                    </button>
                  </div>
                </div>
              `}
        </div>
      `;
    }

    return html``;
  }
}

customElements.define('app-detail', Detail);
