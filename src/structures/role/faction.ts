import { Game } from "../../game";
import { Player } from "../player";

export const enum WinConditionTypes {
    EXCLUSIVE,
    INCLUSIVE
}

/**
 * The win condition can either be [[WinConditionTypes.EXCLUSIVE as exclusive]] or [[WinConditionTypes.INCLUSIVE as inclusive]].
 * 
 * - If the win condition is **exclusive**, then **no other roles / factions with an exclusive win condition can win**. Exclusive win conditions aren't even called if there is more than 1 win condition
 * in the game which is exclusive.
 * - Inclusive win conditions are checked only when there is 1 exclusive win condition and that win condition returns a list of players and not false or undefined. Every inclusive win condition must
 * return a list of players which win with the rest of the players. 
 * 
 * Every faction's and role's win condition gets executed at the end of every phase.
*/
export interface WinCondition {
    type: WinConditionTypes,
    condition: (game: Game) => Array<Player>|undefined|false;
}

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