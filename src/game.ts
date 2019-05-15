import { GameState, SocketParty, GameEventManager, GameEvent } from '@kevupton/game-engine';

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
  calculateModifications (state) {
    console.log('cur state: ', state);
    return { count: [['+', '0.1'], ['*', 2]] };
  },
};

events.registerEvent(Multiply);
