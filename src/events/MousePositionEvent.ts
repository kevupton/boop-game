import { GameEvent, ModificationMap } from '@kevupton/game-engine';
import { GameData } from '../game';

interface MousePosition {
  posX : number;
  posY : number;
  uuid : string;
}

const SPEED = 20;

export const MousePositionEvent : GameEvent<GameData, MousePosition> = {
  name: 'mouse-position-event',
  calculateModifications (
    { players } : GameData,
    { posX, posY, uuid },
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
  },
};
