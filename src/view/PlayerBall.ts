import { ViewItem } from '@kevupton/game-engine';
import { GameState, ViewState } from '../game';

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
    if (!player || !player.vector) {
      return;
    }

    let prevPercentage = 0;
    if (vPlayer &&
      vPlayer.prevPlayerPosition.x === player.playerPosition.x &&
      vPlayer.prevPlayerPosition.y === player.playerPosition.y) {
      prevPercentage = vPlayer.percentage;
    }

    const percentage = Math.min(1, (delta / (200)) + prevPercentage); // todo determine time

    return {
      ...vPlayer,
      x: player.playerPosition.x + (percentage * player.vector.x),
      y: player.playerPosition.y + (percentage * player.vector.y),
      prevPlayerPosition: player.playerPosition,
      percentage,
      color: player.color,
    };
  }

  public getStateScope () : string {
    return `players.${ this.params.uuid }`;
  }

  public getViewStateScope () : string {
    return `players.${ this.params.uuid }`;
  }
}
