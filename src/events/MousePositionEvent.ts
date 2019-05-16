import { GameEvent, ModificationMap } from '@kevupton/game-engine';
import { GameData } from '../game';

interface MousePosition {
  posX : number;
  posY : number;
}

const SPEED = 20;

export const MousePositionEvent : GameEvent<GameData, MousePosition> = {
  name: 'mouse-position-event',
  calculateModifications (
    { player1PosX: x, player1PosY: y } : GameData,
    { posX, posY },
  ) : ModificationMap<GameData> {
    const diffX = posX - x;
    const diffY = posY - y;
    const total = Math.abs(diffX) + Math.abs(diffY);
    const percX = diffX / total;
    const percY = diffY / total;

    const modifications : ModificationMap<GameData> = {
      player1PosX: ['+', percX * SPEED],
      player1PosY: ['+', percY * SPEED],
    };

    return modifications;
  },
};
