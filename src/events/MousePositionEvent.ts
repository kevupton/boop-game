import { GameEvent, ModificationMap, Vector } from '@kevupton/game-engine';
import { GameState } from '../game';

interface MouseData {
  mousePosition : Vector;
  uuid : string;
}

export class MousePositionEvent extends GameEvent<GameState, MouseData> {
  protected calculateModifications (
    { players } : GameState,
    { mousePosition: { x: mouseX, y: mouseY }, uuid } : MouseData,
  ) : ModificationMap<GameState> {
    if (!players[uuid]) {
      return {};
    }

    const { x, y } = players[uuid].mousePosition;

    return {
      ['players.' + uuid + '.mousePosition.x']: ['+', mouseX - x],
      ['players.' + uuid + '.mousePosition.y']: ['+', mouseY - y],
    };
  }
}
