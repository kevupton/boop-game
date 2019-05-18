import { GameController, Vector } from '@kevupton/game-engine';
import { MousePositionEvent } from '../events/MousePositionEvent';
import { MovementSyncEvent } from '../events/MovementSyncEvent';
import { GameState } from '../game';

export class MovementController extends GameController<GameState> {

  static readonly INTERVAL = 300;

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

    if (this.countdown > 0) {
      return;
    }

    this.countdown = MovementController.INTERVAL;


    this.events.triggerLocalEvent(new MovementSyncEvent({
      uuid: this.party.uuid,
    })).subscribe();

    if (!this.current ||
      (this.previous &&
        this.previous.x === this.current.x &&
        this.previous.y === this.current.y)) {

      return;
    }


    this.events.triggerLocalEvent(new MousePositionEvent({
      mousePosition: this.current,
      uuid: this.party.uuid,
    })).subscribe();

    this.previous = this.current;
  }
}
