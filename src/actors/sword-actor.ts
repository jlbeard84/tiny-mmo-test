import * as ex from 'excalibur';
import { GameConstants } from '../constants';
import { GameResources } from '../resources';

export class SwordActor extends ex.Actor {
  private readonly MovementSpeed = .5;

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

  public update(engine: ex.Engine, delta: number) {
    const currentPosition = new ex.Vector(this.pos.x, this.pos.y);
    let upMovement = 0;
    let downMovement = 0;
    let leftMovement = 0;
    let rightMovement = 0;

    if (engine.input.keyboard.isHeld(ex.Input.Keys.Up)) {
      upMovement -= this.MovementSpeed * delta;
    }

    if (engine.input.keyboard.isHeld(ex.Input.Keys.Down)) {
      downMovement += this.MovementSpeed * delta;
    }

    if (engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
      leftMovement -= this.MovementSpeed * delta;
    }

    if (engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
      rightMovement += this.MovementSpeed * delta;
    }

    currentPosition.x += leftMovement + rightMovement;
    currentPosition.y += upMovement + downMovement;

    if (currentPosition.x > GameConstants.WindowWidth) {
      currentPosition.x = GameConstants.WindowWidth;
    } else if (currentPosition.x < 0) {
      currentPosition.x = 0;
    }

    if (currentPosition.y > GameConstants.WindowHeight) {
      currentPosition.y = GameConstants.WindowHeight;
    } else if (currentPosition.y < 0) {
      currentPosition.y = 0;
    }

    this.pos = currentPosition;
  }
}
