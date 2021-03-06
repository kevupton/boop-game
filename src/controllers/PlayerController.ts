import { GameController } from '@kevupton/game-engine';
import randomColor from 'randomcolor';
import { PlayerInitEvent } from '../events/PlayerInitEvent';
import { GameState } from '../game';
import { PlayerBall } from '../view/PlayerBall';

export class PlayerController extends GameController<GameState> {

  public init () : void {
    Object.keys(this.state.players)
      .forEach(uuid => this.createPlayerBall(uuid));

    this.events.on$(PlayerInitEvent).subscribe(event => {
      this.createPlayerBall(event.params.uuid);
    });

    const color = randomColor();

    this.events.trigger(new PlayerInitEvent({
      uuid: this.party.uuid,
      color: color instanceof Array ? color[0] : color,
    }));
  }

  public loop (delta : number) : void {
  }

  private createPlayerBall (uuid : string) {
    this.view.registerViewItem(new PlayerBall({ uuid }));
  }
}
