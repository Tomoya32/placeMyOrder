import $ from 'jquery';
import route from 'can/route/route';
import 'can/route/pushstate/pushstate';
import Map from 'can/map/map';
import reload from 'live-reload';

import main from './main.stache!';
import 'less/styles.less!';

const AppState = Map.extend({});
let state = new AppState();
let render = () => $('#main').html(main(state));

$(() => {
  route(':page', { page: 'home' });
  route(':page/:id', { id: null });
  route.map(state);

  render();
  route.ready();
});

reload(render);