import { GameController } from '@kevupton/game-engine';
import { PlayerInitEvent } from '../events/PlayerInitEvent';
import { GameState } from '../game';
import randomColor from 'randomcolor';
import { PlayerBall } from '../view/PlayerBall';

export class PlayerController extends GameController<GameState> {

  public init () : void {
    this.events.on(PlayerInitEvent).subscribe(event => {
      this.view.registerViewItem(new PlayerBall({ uuid: event.params.uuid }))
    });

    const color = randomColor();

    this.events.triggerLocalEvent(new PlayerInitEvent( {
      uuid: this.party.uuid,
      color: color instanceof Array ? color[0] : color,
    })).subscribe();
  }

  public loop (delta : number) : void {
  }
}
