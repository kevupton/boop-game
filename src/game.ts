import { GameEngine } from '@kevupton/game-engine';
import { MouseController } from './controllers/MouseController';
import { PlayerController } from './controllers/PlayerController';
import { MousePositionEvent } from './events/MousePositionEvent';
import { PlayerInitEvent } from './events/PlayerInitEvent';

export interface GameData {
  canvasWidth : number;
  canvasHeight : number;
  players : {
    [key : string] : {
      x : number;
      y : number;
      color : string;
    }
  }
}

export default new GameEngine<GameData>({
  socketConfig: {
    host: 'p2p.s1r.io',
    rtcConfig: {
      'iceServers': [
        {'urls': 'stun:stun.stunprotocol.org:3478'},
        {'urls': 'stun:stun.l.google.com:19302'},
      ]
    }
  },
  initialState: {
    canvasWidth: 500,
    canvasHeight: 500,
    players: {},
  },
  controllers: [
    MouseController,
    PlayerController,
  ],
  events: [
    MousePositionEvent,
    PlayerInitEvent,
  ],
});


