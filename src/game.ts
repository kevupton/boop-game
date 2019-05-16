import { GameControllerClass, GameEventManager, GameState, SocketParty, GameEvent } from '@kevupton/game-engine';
import { MouseController } from './controllers/MouseController';
import { MousePositionEvent } from './events/MousePositionEvent';

export interface GameData {
  canvasWidth : number;
  canvasHeight : number;
  player1PosX : number;
  player1PosY : number;
}

export const gameState = new GameState<GameData>({
  canvasWidth: 500,
  canvasHeight: 500,
  player1PosX: 250,
  player1PosY: 250,
});

export const party  = new SocketParty<any>({ rtcConfig: {} });
export const gameEventManager = new GameEventManager(gameState, party);

const controllerTypes : GameControllerClass[] = [
  MouseController,
];
const events : GameEvent[] = [
  MousePositionEvent,
];

events.forEach(event => gameEventManager.registerEvent(event));

const controllers = controllerTypes.map(Controller => new Controller(gameState, gameEventManager));

controllers.forEach(controller => controller.init());

const framesPerSecond = 30;
const interval = 1000 / framesPerSecond;

let prevTime = Date.now();
let delta = 0;

const loop = () => {
  requestAnimationFrame(loop);

  const now = Date.now();
  const diff = now - prevTime;
  prevTime = now;

  delta += diff;

  if (delta < interval) {
    return;
  }

  controllers.forEach(controller => controller.loop(delta));
  delta = 0;
};

loop();
