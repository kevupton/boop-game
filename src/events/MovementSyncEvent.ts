import { GameEvent, GameEventType, ModificationMap, Vector } from '@kevupton/game-engine';
import { GameState } from '../game';

interface MovementData {
  uuid : string;
}

const SPEED = 50;

/*
  Movement sync to be done once every 500 ms.
  Not as an event.
 */

export class MovementSyncEvent extends GameEvent<GameState['players']['uuid'], MovementData> {
  protected readonly type = GameEventType.Local;

  protected calculateModifications (
    player: GameState['players']['uuid'],
  ) : ModificationMap<GameState> {
    if (!player) {
      return {};
    }

    const { x, y } = player.playerPosition;
    const { x : mouseX, y : mouseY } = player.mousePosition;

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
      x: percX * SPEED,
      y: percY * SPEED,
    };

    return {
      'playerPosition.x': ['+', prevVector.x],
      'playerPosition.y': ['+', prevVector.y],
      'vector.x': ['+', vector.x - prevVector.x],
      'vector.y': ['+', vector.y - prevVector.y],
    };
  }

  protected getScope (extra = '') : string {
    return `players.${ this.params.uuid }`;
  }
}
