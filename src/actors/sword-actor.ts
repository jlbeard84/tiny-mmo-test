import * as ex from 'excalibur';
import { GameResources } from '../resources';

export class SwordActor extends ex.Actor {
    constructor() {
        super({
          pos: new ex.Vector(150, 150),
          width: 25,
          height: 25,
          color: new ex.Color(255, 255, 255)
        });
    }

    public onInitialize(engine: ex.Engine) {
        this.addDrawing(GameResources.Sword);
     }
}
