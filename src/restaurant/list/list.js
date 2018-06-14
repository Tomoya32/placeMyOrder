import { Component, DefineMap } from 'can';
import Restaurant from 'place-my-order/models/restaurant';
import State from 'place-my-order/models/state';
import City from 'place-my-order/models/city';
import view from './list.stache';
import './list.less';

export const ViewModel = DefineMap.extend({
  get states() {
    return State.getList({});
  },
  state: {
    type: 'string',
    default: null,
    set() {
      // Remove the city when the state changes
      this.city = null;
    }
  },
  get cities() {
    let state = this.state;

    if(!state) {
      return null;
    }

    return City.getList({ filter: { state } });
  },
  city: {
    type: 'string',
    default: null
  },
  get restaurants() {
    let state = this.state;
    let city = this.city;

    if(state && city) {
      return Restaurant.getList({
        filter: {
          'address.state': state,
          'address.city': city
        }
      });
    }

    return null;
  }
});

export default Component.extend({
  tag: 'pmo-restaurant-list',
  ViewModel,
  view
});
