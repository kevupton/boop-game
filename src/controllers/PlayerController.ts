import { GameController } from '@kevupton/game-engine';
import { PlayerInitEvent } from '../events/PlayerInitEvent';
import { GameState } from '../game';
import randomColor from 'randomcolor';
import { PlayerBall } from '../view/PlayerBall';

export class PlayerController extends GameController<GameState> {

  public init () : void {
    this.events.triggerLocalEvent(new PlayerInitEvent( {
      uuid: this.party.uuid,
      color: randomColor(),
    })).subscribe();

    this.view.registerViewItem(new PlayerBall({ uuid: this.party.uuid }))
  }

  public loop (delta : number) : void {
  }
}
