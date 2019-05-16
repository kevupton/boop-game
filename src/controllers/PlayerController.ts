import { GameController } from '@kevupton/game-engine';
import { PlayerInitEvent } from '../events/PlayerInitEvent';
import { GameData } from '../game';
import randomColor from 'randomcolor';

export class PlayerController extends GameController<GameData> {

  public init () : void {
    this.eventManager.triggerLocalEvent(PlayerInitEvent.name, {
      uuid: this.party.uuid,
      color: randomColor(),
    }).subscribe();
  }

  public loop (delta : number) : void {
  }
}
