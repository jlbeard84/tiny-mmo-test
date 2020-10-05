import * as ex from 'excalibur';
import { SwordActor } from './actors';
import { GameResources } from './resources';
import { TestScene } from './scenes';

const game = new ex.Engine({
    width:800,
    height:600
});

const loader = new ex.Loader();
const testScene = new TestScene(game);
const testActor = new SwordActor();

testScene.add(testActor);

game.add('testScene', testScene);

for (let key in GameResources) {
    loader.addResource(GameResources[key]);
}

game.start(loader).then(() => {
    game.goToScene('testScene');
});