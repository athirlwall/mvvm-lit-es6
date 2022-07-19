import { BehaviorSubject } from 'rxjs';
import { MockHttpService } from '../services/core/http.service.mock.js';
import { stateService } from '../services/core/state.service.js';

export class MasterViewModel {
  constructor() {
    this.records = [];
    this.stateService = stateService;
    this.appState = {};
    this.notifier = new BehaviorSubject({});
    this.busy = false;
    this.error = false;
    this.errorState = '';
  }

  async initialize() {
    this.notifier.next(this);
    this.stateService.getStateStore().subscribe(appState => {
      this.appState = appState;
      this.notifyViews();
    });
    await this.loadAllRecords();
    return this;
  }

  notifyViews() {
    this.notifier.next(this);
  }

  async loadAllRecords() {
    this.records = await MockHttpService.fetch('https://master/').then(
      records =>
        records.map(record => ({
          id: record.id,
          name: `${record.firstname} ${record.surname}`,
          telephone: record.telephone,
          email: record.email,
          customerId: record.customerId,
        }))
    );
  }

  toggleBusy() {
    this.busy = !this.busy;
    this.notifyViews();
  }

  toggleError() {
    if (this.error) {
      this.error = false;
      this.errorState = undefined;
    } else {
      this.error = true;
      this.errorState = {
        message: 'ViewModel in Error State',
        code: 1,
      };
    }
    this.notifyViews();
  }
}
