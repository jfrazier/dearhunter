'use strict';

if(window.$ === undefined)
  window.$ = window.jQuery = require('jquery');

$(function() {
  let start_screen_state = new StartScreen();
  let main_state = new MainState();

  window.game = new Phaser.Game(800, 600, Phaser.AUTO);
  // window.game = new Phaser.Game(800, 600, Phaser.AUTO, '', main_state);
  window.game.state.add('startScreen', start_screen_state);
  window.game.state.add('mainState', main_state);
  // window.game.state.start('mainState');
  window.game.state.start('startScreen');
});
