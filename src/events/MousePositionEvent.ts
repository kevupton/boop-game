import { GameEvent, ModificationMap } from '@kevupton/game-engine';
import { GameData } from '../game';

interface MouseData {
  posX : number;
  posY : number;
  uuid : string;
}

const SPEED = 60;

export class MousePositionEvent extends GameEvent<GameData, MouseData> {
  protected calculateModifications (
    { players } : GameData,
    { posX, posY, uuid } : MouseData,
  ) : ModificationMap<GameData> {
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
