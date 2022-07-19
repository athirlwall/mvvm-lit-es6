import { LitElement, html } from 'lit';
import { router } from 'lit-element-router';

import './components/app-link.js';
import './components/app-page.js';
import './views/app-master.js';
import './views/app-detail.js';

export class App extends router(LitElement) {
  static get properties() {
    return {
      title: { type: String },
      route: { type: String },
      params: { type: Object },
      query: { type: Object },
    };
  }

  static get routes() {
    return [
      {
        name: 'master',
        pattern: '',
        data: { title: 'Master' },
      },
      {
        name: 'detail',
        pattern: 'detail/:id',
      },
      {
        name: 'not-found',
        pattern: '*',
      },
    ];
  }

  constructor() {
    super();
    this.route = '';
    this.params = {};
    this.query = {};
    this.title = 'My app';
    this.renderHtml = '';
  }

  router(route, params, query, data) {
    this.route = route;
    this.params = params;
    this.query = query;
    // eslint-disable-next-line no-console
    console.log(route, params, query, data);
  }

  willUpdate() {
    console.log('willUpdate', this.params.id);
    if (this.route === 'master') {
      this.renderHtml = html`<app-master></app-master>`;
    } else if (this.route === 'detail') {
      this.renderHtml = html`<app-detail id=${this.params.id}></app-detail>`;
    } else {
      this.renderHtml = html`Not found`;
    }
  }

  render() {
    return html`${this.renderHtml}`;
  }
}
