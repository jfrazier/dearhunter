'use strict'

class StartScreen {
  init() {
    game.input.keyboard.onUpCallback = function() {
      if (game.state.getCurrentState().state.current === 'startScreen') {
        game.state.start('mainState');
      }
    }
  }

  preload() {
    game.load.image('startScreen', 'images/startScreen.png')

  }

  create() {
    this.startScreen = game.add.sprite(game.world.centerX, game.world.centerY, 'startScreen');
    this.startScreen.anchor.setTo(0.5, 0.5);
  }

  update() {

  }

  render() {

  }
}
