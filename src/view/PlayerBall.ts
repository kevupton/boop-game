import { ViewItem } from '@kevupton/game-engine';
import { GameState, ViewState } from '../game';

export interface PlayerBallParams {
  uuid : string;
}

export class PlayerBall extends ViewItem<GameState, ViewState, PlayerBallParams> {

  public init (gameState : GameState, viewState : ViewState) {
  }

  public render (state : ViewState, ctx : CanvasRenderingContext2D) : void {
    const player = state.players[this.params.uuid];
    if (!player) {
      return;
    }

    const x = this.x;

    ctx.beginPath();
    ctx.arc(x(player.x), x(player.y), 20, 0, 2 * Math.PI);
    ctx.fillStyle = player.color;
    ctx.fill();
  }

  public update ({ players } : GameState, viewState : ViewState, delta : number) : Partial<ViewState> | undefined {
    return {
      players,
    };
  }

}
