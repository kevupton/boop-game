import { GameEngine, Vector } from '@kevupton/game-engine';
import { MovementController } from './controllers/MovementController';
import { PlayerController } from './controllers/PlayerController';
import { MousePositionEvent } from './events/MousePositionEvent';
import { MovementUpdateEvent } from './events/MovementUpdateEvent';
import { PlayerInitEvent } from './events/PlayerInitEvent';

export interface GameState {
  players : {
    [key : string] : {
      playerPosition : Vector;
      mousePosition : Vector;
      facingDirection : Vector;
      speed : Vector;
      color : string;
    }
  }
}

export interface ViewState {
  players : {
    [key : string] : {
      x : number;
      y : number;
      prevPlayerPosition : Vector;
      percentage : number;
      color : string;
    }
  }
}

export default new GameEngine<GameState, ViewState>({
  initialViewState: {
    players: {},
  },
  ticksPerSecond: 10,
  framesPerSecond: 60,
  initialState: {
    players: {},
  },
  controllers: [
    MovementController,
    PlayerController,
  ],
  events: [
    MousePositionEvent,
    PlayerInitEvent,
    MovementUpdateEvent,
  ],
  socketConfig: {
    rtcConfig: {
      'iceServers': [
        { 'urls': 'stun:stun.stunprotocol.org:3478' },
        { 'urls': 'stun:stun.l.google.com:19302' },
      ],
    },
  },
});


