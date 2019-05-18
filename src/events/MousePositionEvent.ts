import { GameEvent, ModificationMap } from '@kevupton/game-engine';
import { GameState } from '../game';

interface MouseData {
  posX : number;
  posY : number;
  uuid : string;
}

const SPEED = 60;

export class MousePositionEvent extends GameEvent<GameState, MouseData> {
  protected calculateModifications (
    { players } : GameState,
    { posX, posY, uuid } : MouseData,
  ) : ModificationMap<GameState> {
    if (!players[uuid]) {
      return {};
    }

    const { x, y } = players[uuid];

    const diffX = posX - x;
    const diffY = posY - y;
    const total = Math.abs(diffX) + Math.abs(diffY);

    if (total === 0) {
      return {};
    }

    const percX = diffX / total;
    const percY = diffY / total;

    return {
      ['players.' + uuid + '.x']: ['+', percX * SPEED],
      ['players.' + uuid + '.y']: ['+', percY * SPEED],
    };
  }
}
