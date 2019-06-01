import { GameController, Vector } from '@kevupton/game-engine';
import { MousePositionEvent } from '../events/MousePositionEvent';
import { MovementUpdateEvent } from '../events/MovementUpdateEvent';
import { GameState } from '../game';

export class MovementController extends GameController<GameState> {

  static readonly INTERVAL = 100;

  private current? : Vector;
  private previous? : Vector;

  private countdown = 0;

  public init () : void {
    window.addEventListener('mousemove', ({ clientX, clientY }) => {
      this.current = {
        x: clientX,
        y: clientY,
      };
    });
  }

  public loop (delta : number) : void {
    this.countdown -= delta;

    this.events.trigger(new MovementUpdateEvent({
      uuid: this.uuid,
      delta,
    }));

    if (this.countdown > 0) {
      return;
    }

    this.countdown = MovementController.INTERVAL;

    if (!this.current ||
      (this.previous &&
        this.previous.x === this.current.x &&
        this.previous.y === this.current.y)) {

      return;
    }

    this.events.trigger(new MousePositionEvent({
      mousePosition: this.current,
      uuid: this.uuid,
    }));

    this.previous = this.current;
  }
}
