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
      ['players.' + uuid]: ['=', { x: 200, y: 200, color, }],
    };
  }
}
