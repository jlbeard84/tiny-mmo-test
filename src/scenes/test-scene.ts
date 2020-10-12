import * as ex from 'excalibur';
import { Vector } from 'excalibur';
import { SwordActor } from '../actors';
import { NetworkService } from '../services';

export class TestScene extends ex.Scene {
 
    private _localActor: SwordActor;
    private _otherActors: SwordActor[] = [];
    private _networkService: NetworkService;
    private _priorPos: ex.Vector = null;

    constructor(engine: ex.Engine, networkService: NetworkService) {
        super(engine);
        this._networkService = networkService;
    }

    public onInitialize(engine: ex.Engine) {
        this._localActor = new SwordActor();

        this.add(this._localActor);
    }

    public onPostUpdate(engine: ex.Engine, delta: number) {
        super.onPostUpdate(engine, delta);

        if (this._priorPos == null || 
            this._priorPos.x != this._localActor.pos.x || 
            this._priorPos.y != this._localActor.pos.y) {

            this._networkService.sendPosition(this._localActor.pos.x, this._localActor.pos.y);
            this._priorPos = new ex.Vector(this._localActor.pos.x, this._localActor.pos.y);
        }
    }

    public onActivate() {}

    public onDeactivate() {}
}