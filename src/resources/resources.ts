import * as ex from 'excalibur';

const swordTexture = require('./images/sword.png');
const testBackgroundTexture = require('./images/test-bg.png');

export const GameResources = {
    Sword: new ex.Texture(swordTexture),
    TestBackground: new ex.Texture(testBackgroundTexture)
};
