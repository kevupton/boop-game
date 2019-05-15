import { GameState, SocketParty, GameEventManager, GameEvent, GameStateModification, ModificationMap } from '@kevupton/game-engine';
import { not } from 'rxjs/internal-compatibility';

export interface GameData {
  count : number;
}

export const gameState = new GameState<GameData>({
  count: 1,
});


export const party = new SocketParty<any>({ rtcConfig: {} });

party.message$.subscribe(message => {
  console.log(message);
});

export const events = new GameEventManager(gameState, party);

gameState.state$.subscribe(state => {
  console.log('new state: ', state);
});

const Multiply : GameEvent<GameData> = {
  name: 'multiply',
  calculateModifications (state) : ModificationMap<GameData>  {
    console.log('cur state: ', state);
    const tooHigh : ModificationMap<GameData> = { count: ['=', 1] };
    const notHighEnough : ModificationMap<GameData> = { count: [['+', '0.1'], ['*', 2]] };
    const modification = state.count > 1000000 ?  tooHigh : notHighEnough;
    console.log('modification', modification);
    return modification;
  },
};

events.registerEvent(Multiply);
