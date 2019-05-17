import { GameEvent, ModificationMap } from '@kevupton/game-engine';
import { GameData } from '../game';

interface PlayerData {
  uuid : string;
  color : string;
}

export class PlayerInitEvent extends GameEvent<GameData, PlayerData> {
  protected calculateModifications (
    state : GameData,
    { uuid, color } : PlayerData,
  ) : ModificationMap<GameData> {
    return {
      ['players.' + uuid]: ['=', { x: 200, y: 200, color, }],
    };
  }
}
