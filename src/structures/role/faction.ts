import { Game } from "../../game";
import { Player } from "../player";

/**
 * If the win condition returns an array of [[Player]], then those are the winners and the game ends.
 * If the function returns `undefined` or `false` then the role doesn't win.
 * 
 * Every faction's and role's win condition gets executed:
 * - Every time someone gets lynched
 * - At the start of each day
*/
export type WinCondition = (game: Game) => Array<Player>|undefined|false;

export interface FactionData {
    name: string,
    winCondition?: WinCondition,
    factionAction?: boolean
}

export class Faction {
    name: string;
    winCondition?: WinCondition;
    factionAction?: boolean;
    game: Game;

    constructor(game: Game, data: FactionData) {
        this.name = data.name;
        this.winCondition = data.winCondition;
        this.factionAction = data.factionAction;
        this.game = game;
    }

    players() : Array<Player> {
        return this.game.players.filterArray((p) => p.role.faction === this);
    }

}