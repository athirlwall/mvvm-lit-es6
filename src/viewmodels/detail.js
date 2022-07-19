import { BehaviorSubject } from 'rxjs';
import { MockHttpService } from '../services/core/http.service.mock.js';
import { stateService } from '../services/core/state.service.js';
import { DARK, LIGHT } from '../types.js';

export class DetailViewModel {
  constructor() {
    this.record = {};
    this.stateService = stateService;
    this.appState = {};
    this.notifier = new BehaviorSubject({});
  }

  async initialize(id) {
    this.notifier.next(this);
    this.stateService.getStateStore().subscribe(appState => {
      this.appState = appState;
      console.log('appState', appState);
      this.notifyViews();
    });
    await this.loadRecord(id);
    return this;
  }

  notifyViews() {
    this.notifier.next(this);
  }

  toggleMailFlag() {
    this.record.mail = !this.record.mail;
    this.notifyViews();
  }

  async loadRecord(id) {
    this.record = await MockHttpService.fetch(`https://detail/${id}`).then(
      record => {
        const customer = {
          id: record.id,
          title: record.title,
          firstname: record.firstname,
          surname: record.surname,
          address1: record.address1,
          address2: record.address2,
          postcode: record.postcode,
          telephone: record.telephone,
          email: record.email,
          mail: record.mail,
          age: record.age,
        };

        return customer;
      }
    );
  }

  toggleLightDark() {
    this.stateService.setState(
      'lightMode',
      this.appState.lightMode === LIGHT ? DARK : LIGHT
    );
  }
}
