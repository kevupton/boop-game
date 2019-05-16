import { GameEvent, GameEventManager, GameState, ModificationMap, SocketParty } from '@kevupton/game-engine';

export interface GameData {
  count : number;
}

export const gameState = new GameState<GameData>({
  count: 1,
});

export const party = new SocketParty<any>({ rtcConfig: {} });

// party.message$.subscribe(message => {
//   console.log(message);
// });

export const events = new GameEventManager(gameState, party);
let prevTime : number = Date.now();
gameState.state$.subscribe(state => {
  console.log('new state: ', state, Date.now() - prevTime);
});

const Multiply : GameEvent<GameData> = {
  name: 'multiply',
  calculateModifications (state) : ModificationMap<GameData> {
    console.log('cur state: ', state);
    prevTime = Date.now();
    const tooHigh : ModificationMap<GameData>       = { count: ['=', 1] };
    const notHighEnough : ModificationMap<GameData> = { count: [['+', 0.1], ['*', 2]] };
    const modification                              = state.count > 1000000 ? tooHigh : notHighEnough;
    console.log('modification', modification);
    return modification;
  },
};

events.registerEvent(Multiply);
