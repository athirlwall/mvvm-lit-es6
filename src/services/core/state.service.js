import { BehaviorSubject } from 'rxjs';
import { LIGHT } from '../../types.js';

const defaultState = {
  lightMode: LIGHT,
};

class StateService {
  constructor() {
    this.state = new BehaviorSubject(defaultState);
  }

  setState(key, value) {
    const state = this.state.getValue();
    this.state.next({
      ...state,
      [key]: value,
    });
  }

  getStateStore() {
    return this.state;
  }
}

export const stateService = new StateService();
