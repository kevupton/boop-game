import { MousePositionEvent } from '../events/MousePositionEvent';
import { GameData } from '../game';
import { GameController } from '@kevupton/game-engine';

const INTERVAL = 100;

export class MouseController extends GameController<GameData> {

  private currentX = 0;
  private currentY = 0;

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

    this.eventManager.triggerLocalEvent(MousePositionEvent.name, {
      posX: this.currentX,
      posY: this.currentY,
    }).subscribe();

    this.countdown += INTERVAL;
  }
}
