import { GameEvent, ModificationMap } from '@kevupton/game-engine';
import { GameState } from '../game';

interface PlayerData {
  uuid : string;
  color : string;
}

export class PlayerInitEvent extends GameEvent<GameState, PlayerData> {
  protected calculateModifications (
    state : GameState,
    { uuid, color } : PlayerData,
  ) : ModificationMap<GameState> {
    return {
      ['players.' + uuid]: ['=', {
        playerPosition: { x: 200, y: 200 },
        mousePosition: { x: 200, y: 200 },
        vector: { x: 0, y: 0 },
        color,
      }],
    };
  }
}
