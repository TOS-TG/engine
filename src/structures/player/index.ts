import { Game } from "../../game";
import { Role } from "../role";

export interface PlayerData {
    name: string,
    num: number,
    id: string,
    role: Role
}

export const enum PlayerState {
    Alive,
    Dead,
    Spectator,
    Host
}

export const enum PlayerJudgement {
    Guilty,
    Innocent,
    Abstain
}

export class Player {
    game: Game;
    name: string;
    num: number;
    role: Role;
    state: PlayerState;
    targets?: Array<Player>;
    votes: number;
    votedFor?: Player;
    judgement?: PlayerJudgement;
    /**
     * An object which gets cleared at the end of every night, anything can be stored inside.
     */
    nightly: Record<string, unknown>;
    constructor(game: Game, data: PlayerData) {
        this.game = game;
        this.name = data.name;
        this.num = data.num;
        this.role = data.role;
        this.state = PlayerState.Alive;
        this.votes = 0;
        this.nightly = {};
    }

    
}