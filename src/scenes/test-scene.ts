import * as ex from 'excalibur';
import { SwordActor } from '../actors';

export class TestScene extends ex.Scene {
 
    private _localActor: SwordActor;
    private _otherActors: SwordActor[] = [];

    public onInitialize(engine: ex.Engine) {
        this._localActor = new SwordActor();

        this.add(this._localActor);
    }

    public onActivate() {}

    public onDeactivate() {}
}