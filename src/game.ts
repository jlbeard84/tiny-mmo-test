import * as ex from 'excalibur';
import { GameConstants } from './constants';
import { ResourceLoader } from './resources';

import { TestScene } from './scenes';

const game = new ex.Engine({
    width: GameConstants.WindowWidth,
    height: GameConstants.WindowHeight
});

const loader = new ResourceLoader();

const testScene = new TestScene(game);
game.add('testScene', testScene);

game.start(loader).then(() => {
    game.goToScene('testScene');
});