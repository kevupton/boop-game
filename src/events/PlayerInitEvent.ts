import { GameEvent, ModificationMap } from '@kevupton/game-engine';
import { GameData } from '../game';

interface PlayerData {
  uuid : string;
  color : string;
}

export const PlayerInitEvent : GameEvent<GameData, PlayerData> = {
  name: 'player-init-event',
  calculateModifications (
    state,
    { uuid, color },
  ) : ModificationMap<GameData> {
    return {
      ['players.' + uuid]: ['=', { x: 200, y: 200, color, }],
    };
  },
};

// TODO create a player leave event
