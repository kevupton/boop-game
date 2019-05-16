import { GameControllerClass, GameEvent, GameEventManager, GameState, SocketParty } from '@kevupton/game-engine';
import { MouseController } from './controllers/MouseController';
import { PlayerController } from './controllers/PlayerController';
import { MousePositionEvent } from './events/MousePositionEvent';
import { PlayerInitEvent } from './events/PlayerInitEvent';

export interface GameData {
  canvasWidth : number;
  canvasHeight : number;
  players: {
    [key : string] : {
      x : number;
      y : number;
      color : string;
    }
  }
}

export const gameState = new GameState<GameData>({
  canvasWidth: 500,
  canvasHeight: 500,
  players: {}, // TODO implement on player delete
});

export const party            = new SocketParty<any>({ rtcConfig: {} });
export const gameEventManager = new GameEventManager(gameState, party);

const controllerTypes : GameControllerClass[] = [
  MouseController,
  PlayerController,
];
const events : GameEvent[]                    = [
  MousePositionEvent,
  PlayerInitEvent,
];

events.forEach(event => gameEventManager.registerEvent(event));

party.party$.subscribe(party => {
  const controllers = controllerTypes.map(Controller =>
    new Controller(gameState, party, gameEventManager),
  );
  controllers.forEach(controller => controller.init());

  const framesPerSecond = 30;
  const interval        = 1000 / framesPerSecond;

  let prevTime = Date.now();
  let delta    = 0;

  const loop = () => {
    requestAnimationFrame(loop);

    const now  = Date.now();
    const diff = now - prevTime;
    prevTime   = now;

    delta += diff;

    if (delta < interval) {
      return;
    }

    controllers.forEach(controller => controller.loop(delta));
    delta = 0;
  };

  loop();
});


