import { ViewItem } from '@kevupton/game-engine';
import { GameState, ViewState, default as gameManager } from '../game';

export interface PlayerBallParams {
  uuid : string;
}

type ViewStateScope = ViewState['players']['uuid'] | undefined;
type StateScope = GameState['players']['uuid'] | undefined;

export class PlayerBall extends ViewItem<GameState, ViewState, PlayerBallParams, StateScope, ViewStateScope> {

  public init (gameState : StateScope, viewState : ViewStateScope) {
  }

  public render (player : ViewStateScope, ctx : CanvasRenderingContext2D) : void {
    if (!player) {
      return;
    }

    const { _ } = this;

    ctx.beginPath();
    ctx.arc(_(player.x), _(player.y), 20, 0, 2 * Math.PI);
    ctx.fillStyle = player.color;
    ctx.fill();
  }

  public update (
    player : StateScope,
    vPlayer : ViewStateScope,
    delta : number,
  ) {
    if (!player || !player.speed) {
      return;
    }

    let prevPercentage = 0;
    if (vPlayer &&
      vPlayer.prevPlayerPosition.x === player.playerPosition.x &&
      vPlayer.prevPlayerPosition.y === player.playerPosition.y) {
      prevPercentage = vPlayer.percentage;
    }

    const percentage = Math.min(1, (delta / (1000 / gameManager.ticksPerSecond)) + prevPercentage);

    const newX = player.playerPosition.x + percentage * player.speed.x;
    const newY = player.playerPosition.y + percentage * player.speed.y;

    /*
      Only rerender if they are in a new position
     */
    if (!vPlayer || vPlayer.x !== newX || vPlayer.y !== newY) {
      return {
        ...vPlayer,
        x: newX,
        y: newY,
        percentage,
        color: player.color,
        // this needs to use a different reference so that it does sync updates
        prevPlayerPosition: { ...player.playerPosition },
      };
    }
  }

  public getStateScope () : string {
    return `players.${ this.params.uuid }`;
  }

  public getViewStateScope () : string {
    return `players.${ this.params.uuid }`;
  }
}
