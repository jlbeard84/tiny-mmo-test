import * as ex from 'excalibur';
import { GameConstants } from './constants';
import { ResourceLoader } from './resources';

import { TestScene } from './scenes';
import { NetworkService } from './services';

const game = new ex.Engine({
    width: GameConstants.WindowWidth,
    height: GameConstants.WindowHeight
});

const loader = new ResourceLoader();
const networkService = new NetworkService();

const testScene = new TestScene(game, networkService);
game.add('testScene', testScene);

game.start(loader).then(() => {
    game.goToScene('testScene');
});