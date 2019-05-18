import { GameEvent, ModificationMap, Vector } from '@kevupton/game-engine';
import { GameState } from '../game';

interface MovementData {
  uuid : string;
}

const SPEED = 50;

export class MovementSyncEvent extends GameEvent<GameState, MovementData> {
  protected calculateModifications (
    { players } : GameState,
    { uuid } : MovementData,
  ) : ModificationMap<GameState> {
    if (!players[uuid]) {
      return {};
    }

    const { x, y } = players[uuid].playerPosition;
    const { x : mouseX, y : mouseY } = players[uuid].mousePosition;

    const diffX = mouseX - x;
    const diffY = mouseY - y;
    const total = Math.abs(diffX) + Math.abs(diffY);

    if (total === 0) {
      return {};
    }

    const percX = diffX / total;
    const percY = diffY / total;

    const prevVector = players[uuid].vector || {
      x: 0,
      y: 0,
    };

    const vector : Vector = {
      x: percX * SPEED,
      y: percY * SPEED,
    };

    return {
      ['players.' + uuid + '.playerPosition.x']: ['+', prevVector.x],
      ['players.' + uuid + '.playerPosition.y']: ['+', prevVector.y],
      ['players.' + uuid + '.vector.x']: ['+', vector.x - prevVector.x],
      ['players.' + uuid + '.vector.y']: ['+', vector.y - prevVector.y],
    };
  }
}
