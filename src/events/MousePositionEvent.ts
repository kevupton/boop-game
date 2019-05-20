import { GameEvent, ModificationMap, Vector } from '@kevupton/game-engine';
import { GameState } from '../game';

interface MouseData {
  mousePosition : Vector;
  uuid : string;
}

export class MousePositionEvent extends GameEvent<GameState['players']['uuid'], MouseData> {

  protected calculateModifications (
    player : GameState['players']['uuid'],
    { mousePosition: { x: mouseX, y: mouseY } } : MouseData,
  ) : ModificationMap<GameState> {
    if (!player) {
      return {};
    }

    const { x, y } = player.mousePosition;

    return {
      'mousePosition.x': ['+', mouseX - x],
      'mousePosition.y': ['+', mouseY - y],
    };
  }

  protected getScope (extra = '') {
    return `players.${ this.params.uuid }`;
  }
}
