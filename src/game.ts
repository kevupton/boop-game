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
    host: 'ec2-13-236-85-45.ap-southeast-2.compute.amazonaws.com',
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


