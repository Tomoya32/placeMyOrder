import 'steal-qunit';
import 'pmo/models/fixtures/';
import AppState from '../appstate';
import Order from 'pmo/models/order';
import { ViewModel } from './order';

QUnit.module('Order ViewModel');

test('Default order is initialized', () => {
  let vm = new ViewModel();
  ok(vm.attr('order') instanceof Order);
});

test('canPlaceOrder indicates whether the order has items', () => {
  let vm = new ViewModel();
  let items = vm.attr('order.items');

  let item = {
    name: 'pabellon criollo',
    price: 35.90
  };

  ok(!items.attr('length'), 'order has no items');
  ok(!vm.attr('canPlaceOrder'), 'user can not place order without items');

  items.push(item);

  equal(items.attr('length'), 1, 'order has 1 item');
  ok(vm.attr('canPlaceOrder'), 'user can place the order');
});

asyncTest('Setting slug gets a restaurant and it is added to order', () => {
  let vm = new ViewModel({ slug: 'spago', '@root': new AppState() });
  let deferred = vm.attr('restaurant');

  deferred.then(restaurant => {
    equal(restaurant.attr('name'), 'Spago', 'Got expected restaurant');
    equal(vm.attr('order.restaurant'), restaurant.attr('_id'),
      'Restaurant set on order');
    start();
  });
});
