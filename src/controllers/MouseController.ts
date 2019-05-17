import { MousePositionEvent } from '../events/MousePositionEvent';
import { GameData } from '../game';
import { GameController } from '@kevupton/game-engine';

const INTERVAL = 100;

export class MouseController extends GameController<GameData> {

  private currentX? : number;
  private currentY? : number;

  private countdown = 0;

  public init () : void {
    window.addEventListener('mousemove', ({ clientX, clientY }) => {
      this.currentX = clientX;
      this.currentY = clientY;
    });
  }

  public loop (delta : number) : void {
    this.countdown -= delta;

    if (this.countdown > 0) {
      return;
    }

    if (this.currentY === undefined || this.currentX === undefined) {
      return;
    }

    this.eventManager.triggerLocalEvent(new MousePositionEvent({
      posX: this.currentX,
      posY: this.currentY,
      uuid: this.party.uuid,
    })).subscribe();

    this.countdown = INTERVAL;
  }
}
