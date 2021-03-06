import { GameEvent, GameEventType, ModificationMap, Vector } from '@kevupton/game-engine';
import { GameState } from '../game';

interface MovementData {
  uuid : string;
  delta : number;
}

const SPEED = 200;

/*
 Movement sync to be done once every 500 ms.
 Not as an event.
 */

export class MovementUpdateEvent extends GameEvent<GameState, MovementData, GameState['players']> {
  readonly name = 'MovementUpdateEvent';

  public readonly type = GameEventType.Local;

  protected calculateModifications (
    players : GameState['players'],
    { delta } : MovementData,
  ) : ModificationMap<GameState> {

    return Object.assign(
      {},
      ...Object.keys(players).map(id => this.createChanges(players, id, delta)),
    );
  }

  private createChanges (players : GameState['players'], uuid : string, delta : number) {
    const player = players[uuid];
    const { _ } = this;

    const { x, y }                 = player.playerPosition;
    const { x: mouseX, y: mouseY } = player.mousePosition;

    const diffX = mouseX - x;
    const diffY = mouseY - y;
    const total = Math.abs(diffX) + Math.abs(diffY);

    if (total === 0) {
      return {};
    }

    const percX = diffX / total;
    const percY = diffY / total;

    const prevVector = player.vector || {
      x: 0,
      y: 0,
    };

    const vector : Vector = {
      x: percX * _(SPEED, delta),
      y: percY * _(SPEED, delta),
    };

    return {
      [`${uuid}.playerPosition.x`]: ['+', prevVector.x],
      [`${uuid}.playerPosition.y`]: ['+', prevVector.y],
      [`${uuid}.vector.x`]: ['+', vector.x - prevVector.x],
      [`${uuid}.vector.y`]: ['+', vector.y - prevVector.y],
    };
  }

  protected getScope (extra = '') : string {
    return 'players';
  }
}
