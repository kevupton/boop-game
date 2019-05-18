import { ViewItem } from '@kevupton/game-engine';
import { MovementController } from '../controllers/MovementController';
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

  public update (
    { players } : GameState,
    { players: vPlayers } : ViewState,
    delta : number,
  ) : Partial<ViewState> | void {
    const player = players[this.params.uuid];

    if (!player || !player.vector) {
      return;
    }

    const vPlayer = vPlayers[this.params.uuid] || { percentage: 0, prevPlayerPosition: {} };

    let prevPercentage = 0;
    if (vPlayer.prevPlayerPosition.x === player.playerPosition.x &&
      vPlayer.prevPlayerPosition.y === player.playerPosition.y) {
      prevPercentage = vPlayer.percentage;
    }

    const percentage = Math.min(1, (delta / (200)) + prevPercentage);

    // console.log(JSON.stringify(vPlayer), JSON.stringify(player));
    // console.log(vPlayer.prevPlayerPosition.x === player.playerPosition.x &&
    //   vPlayer.prevPlayerPosition.y === player.playerPosition.y);
    // console.log(prevPercentage, percentage);

    return {
      players: {
        ...vPlayers,
        [this.params.uuid]: {
          ...vPlayer,
          x: player.playerPosition.x + (percentage * player.vector.x),
          y: player.playerPosition.y + (percentage * player.vector.y),
          prevPlayerPosition: { ...player.playerPosition },
          percentage,
          color: player.color,
        },
      },
    };
  }

}
